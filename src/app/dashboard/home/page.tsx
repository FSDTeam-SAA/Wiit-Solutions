"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImagePlus, Loader2 } from 'lucide-react'
import Image from "next/image"
import QuillEditor from "../_components/quill-editor"
import { useSession } from "next-auth/react"
import { toast } from "sonner"


export default function EditContentForm() {
  const { data: session } = useSession()
  const token = (session?.user as { token: string })?.token

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    buttonText: "",
    buttonLink: "",
  })

  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null)
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
    setError(null)
  }

  const handleEditorChange = (value: string) => {
    handleInputChange("description", value)
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return


    setLogo(file)
    setError(null)
    const reader = new FileReader()
    reader.onload = () => setLogoPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setBackgroundImage(file)
    setError(null)
    const reader = new FileReader()
    reader.onload = () => setBackgroundPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('subtitle', formData.subtitle)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('button_text', formData.buttonText)
      formDataToSend.append('button_link', formData.buttonLink)

      if (logo) {
        formDataToSend.append('logo', logo)
      }
      if (backgroundImage) {
        formDataToSend.append('back_img', backgroundImage)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to save banner')
      }

      toast.success(result.message || "Banner saved successfully!")

      // Update previews with new URLs if they were uploaded
      if (result.data?.logo) {
        setLogoPreview(result.data.logo)
        setLogo(null)
      }
      if (result.data?.back_img) {
        setBackgroundPreview(result.data.back_img)
        setBackgroundImage(null)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }


  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const { data } = await response.json()
          if (data) {
            setFormData({
              title: data.title || "",
              subtitle: data.subtitle || "",
              description: data.description || "",
              buttonText: data.button_text || "",
              buttonLink: data.button_link || "",
            })

            if (data.logo) setLogoPreview(data.logo)
            if (data.back_img) setBackgroundPreview(data.back_img)
          }
        } else {
          throw new Error('Failed to fetch banner data')
        }
      } catch (error) {
        console.error('Error fetching initial data:', error)
        toast.error('Failed to load banner data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchInitialData() // <-- 👈 this line was missing
  }, [token])




  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <Card className="py-10 shadow-md">
      <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
        <CardTitle className="text-xl sm:text-2xl text-center">Edit Banner</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 px-4 sm:px-6">
          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div>
            <Label htmlFor="title">Main Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>

          <div>
            <Label htmlFor="subtitle">Sub Title</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => handleInputChange("subtitle", e.target.value)}
              placeholder="Enter subtitle"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <QuillEditor
              id="description"
              value={formData.description}
              onChange={handleEditorChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo</Label>
              <div className="flex flex-col items-center gap-4">
                <div className="h-32 w-32 flex items-center justify-center border border-dashed rounded-md bg-muted">
                  {logoPreview ? (
                    <Image
                      src={logoPreview}
                      alt="Logo preview"
                      width={128}
                      height={128}
                      className="h-full w-full object-contain p-2"
                      unoptimized={logoPreview.startsWith('blob:')}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg'
                      }}
                    />
                  ) : (
                    <ImagePlus className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <div className="w-full">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background">Background Image</Label>
              <div className="flex flex-col items-center gap-4">
                <div className="h-32 w-full max-w-xs flex items-center justify-center border border-dashed rounded-md bg-muted">
                  {backgroundPreview ? (
                    <Image
                      src={backgroundPreview}
                      alt="Background preview"
                      width={300}
                      height={150}
                      className="h-full w-full object-cover p-2"
                      unoptimized={backgroundPreview.startsWith('blob:')}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg'
                      }}
                    />
                  ) : (
                    <ImagePlus className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <div className="w-full">
                  <Input
                    id="background"
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={formData.buttonText}
                onChange={(e) => handleInputChange("buttonText", e.target.value)}
                placeholder="Enter button text"
              />
            </div>

            <div>
              <Label htmlFor="buttonLink">Button Link</Label>
              <Input
                id="buttonLink"
                value={formData.buttonLink}
                onChange={(e) => handleInputChange("buttonLink", e.target.value)}
                placeholder="Enter button link"
                type="text"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-4 sm:px-6 pb-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="w-[200px]"
            disabled={isSubmitting}
          >

            {isSubmitting ? "Saving..." : "Save"}

          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
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

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB in bytes

export default function EditContentForm() {
  const { data: session } = useSession()
  const token = (session?.user as { token: string })?.token

  const [formData, setFormData] = useState({
    title: "My Awesome Project",
    subtitle: "A brief tagline goes here",
    description: "<p>This is a detailed description of the project. You can write multiple paragraphs here.</p>",
    buttonText: "Save Changes",
    buttonLink: "#",
  })

  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null)
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
    
    if (file.size > MAX_FILE_SIZE) {
      setError('Logo image must be smaller than 2MB')
      return
    }
    
    setLogo(file)
    setError(null)
    const reader = new FileReader()
    reader.onload = () => setLogoPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    if (file.size > MAX_FILE_SIZE) {
      setError('Background image must be smaller than 2MB')
      return
    }
    
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
      formDataToSend.append('main_title', formData.title)
      formDataToSend.append('sub_title_after_main_title', formData.subtitle)
      formDataToSend.append('second_sub_title_content', formData.description)
      formDataToSend.append('button_text', formData.buttonText)
      formDataToSend.append('button_link', formData.buttonLink)

      if (logo) {
        formDataToSend.append('logo', logo)
      }
      if (backgroundImage) {
        formDataToSend.append('background_image', backgroundImage)
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
        setError(result.message || 'Failed to save banner')
        console.error('Error:', result)
        return
      }

      console.log('Success:', result)
    } catch (error) {
      setError('An unexpected error occurred')
      console.error('Fetch error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          if (data) {
            setFormData({
              title: data.main_title || formData.title,
              subtitle: data.sub_title_after_main_title || formData.subtitle,
              description: data.second_sub_title_content || formData.description,
              buttonText: data.button_text || formData.buttonText,
              buttonLink: data.button_link || formData.buttonLink,
            })

            if (data.logo_url) {
              setLogoPreview(data.logo_url)
            }
            if (data.background_image_url) {
              setBackgroundPreview(data.background_image_url)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching initial data:', error)
      }
    }

    if (token) {
      fetchInitialData()
    }
  }, [token, formData.title, formData.subtitle, formData.description, formData.buttonText, formData.buttonLink])

  return (
    <Card className="py-10 shadow-md ">
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
            <Label htmlFor="description">Second Sub Title</Label>
            <QuillEditor
              id="description"
              value={formData.description}
              onChange={handleEditorChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo</Label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="h-32 w-32 flex items-center justify-center border border-dashed rounded-md">
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    width={128}
                    height={128}
                    className="h-full w-full object-contain p-2"
                    unoptimized={logoPreview.startsWith('blob:')}
                  />
                ) : (
                  <ImagePlus className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="background">Background Image</Label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="h-32 w-32 flex items-center justify-center border border-dashed rounded-md">
                {backgroundPreview ? (
                  <Image
                    src={backgroundPreview}
                    alt="Background preview"
                    width={128}
                    height={128}
                    className="h-full w-full object-contain p-2"
                    unoptimized={backgroundPreview.startsWith('blob:')}
                  />
                ) : (
                  <ImagePlus className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <Input
                id="background"
                type="file"
                accept="image/*"
                onChange={handleBackgroundChange}
              />
            </div>
          </div>

          <div className="space-y-4">
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
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-4 sm:px-6 pb-6">
          <Button type="submit" className="w-[200px]" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              formData.buttonText
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
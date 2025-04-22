"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import QuillEditor from "../_components/quill-editor"

export default function EditableContent() {
  const [content, setContent] = useState({
    title: "",
    subtitle1: "",
    description1: "",
    subtitle2: "",
    description2: "",
    buttonText: "",
    buttonLink: "",
    image1: {
      url: "",
      fileName: "",
      isNew: false,
    },
    image2: {
      url: "",
      fileName: "",
      isNew: false,
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const { data: session } = useSession()
  const token = (session?.user as { token: string })?.token

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContent((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditorChange = (key: "description1" | "description2", value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }))
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    imageKey: "image1" | "image2"
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setContent((prev) => ({
        ...prev,
        [imageKey]: {
          url: imageUrl,
          fileName: file.name,
          isNew: true,
        },
      }))
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!token) return

      setIsFetching(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/aboutus`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const { data } = await response.json()
          if (data) {
            setContent({
              title: data.main_title || "",
              subtitle1: data.first_paragraph_subtitle || "",
              description1: data.first_paragraph_content || "",
              subtitle2: data.second_paragraph_subtitle || "",
              description2: data.second_paragraph_content || "",
              buttonText: data.name || "",
              buttonLink: data.link || "",
              image1: {
                url: data.img1 || "",
                fileName: data.img1 ? data.img1.split('/').pop() || "image1" : "",
                isNew: false,
              },
              image2: {
                url: data.img2 || "",
                fileName: data.img2 ? data.img2.split('/').pop() || "image2" : "",
                isNew: false,
              },
            })
          }
        } else {
          throw new Error("Failed to fetch data")
        }
      } catch (error) {
        console.error("Error fetching initial data:", error)
        toast.error("Failed to load About Us data")
      } finally {
        setIsFetching(false)
      }
    }

    fetchInitialData()
  }, [token])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("main_title", content.title)
      formData.append("first_paragraph_subtitle", content.subtitle1)
      formData.append("first_paragraph_content", content.description1)
      formData.append("second_paragraph_subtitle", content.subtitle2)
      formData.append("second_paragraph_content", content.description2)
      formData.append("name", content.buttonText)
      formData.append("link", content.buttonLink)

      const fileInput1 = document.getElementById("image1") as HTMLInputElement
      const fileInput2 = document.getElementById("image2") as HTMLInputElement

      if (content.image1.isNew && fileInput1?.files?.[0]) {
        formData.append("img1", fileInput1.files[0])
      }

      if (content.image2.isNew && fileInput2?.files?.[0]) {
        formData.append("img2", fileInput2.files[0])
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/aboutus`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to save content")
      }

      const { data, message } = await response.json()
      toast.success(message || "Content saved successfully!")

      // Update state with new image URLs if they were uploaded
      if (data) {
        setContent(prev => ({
          ...prev,
          image1: {
            url: data.img1 || prev.image1.url,
            fileName: data.img1 ? data.img1.split('/').pop() || "image1" : prev.image1.fileName,
            isNew: false,
          },
          image2: {
            url: data.img2 || prev.image2.url,
            fileName: data.img2 ? data.img2.split('/').pop() || "image2" : prev.image2.fileName,
            isNew: false,
          },
        }))
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save content")
      console.error("Save error:", error)
    } finally {
      setIsLoading(false)
    }
  }



  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className=" px-4 py-8">
      <div className="py-4 text-[30px]">
        <h1>About Us</h1>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Main Title</Label>
              <Input
                id="title"
                name="title"
                value={content.title}
                onChange={handleChange}
                placeholder="Enter main title"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle1">First Paragraph Subtitle</Label>
              <Input
                id="subtitle1"
                name="subtitle1"
                value={content.subtitle1}
                onChange={handleChange}
                placeholder="Enter first paragraph subtitle"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description1">Description 1</Label>
              <QuillEditor
                id="description1"
                value={content.description1}
                onChange={(val) => handleEditorChange("description1", val)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  name="buttonText"
                  value={content.buttonText}
                  onChange={handleChange}
                  placeholder="Enter button text"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buttonLink">Button Link</Label>
                <Input
                  id="buttonLink"
                  name="buttonLink"
                  value={content.buttonLink}
                  onChange={handleChange}
                  placeholder="Enter button link"
                  disabled={isLoading}
                  required
                  type="text"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image1">Image Left</Label>
              {content.image1.url ? (
                <div className="relative h-48 w-full border rounded-md overflow-hidden bg-muted">
                  <Image
                    src={content.image1.url}
                    alt="Image 1 preview"
                    fill
                    className="object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg'
                    }}
                  />
                </div>
              ) : (
                <div className="h-48 w-full border rounded-md bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No image selected</span>
                </div>
              )}
              <Input
                id="image1"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "image1")}
                disabled={isLoading}
              />
              {content.image1.fileName && (
                <p className="text-sm text-muted-foreground">
                  File: <span className="font-medium">{content.image1.fileName}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle2">Second Paragraph Subtitle</Label>
              <Input
                id="subtitle2"
                name="subtitle2"
                value={content.subtitle2}
                onChange={handleChange}
                placeholder="Enter second paragraph subtitle"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description2">Description 2</Label>
              <QuillEditor
                id="description2"
                value={content.description2}
                onChange={(val) => handleEditorChange("description2", val)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image2">Image Right</Label>
              {content.image2.url ? (
                <div className="relative h-48 w-full border rounded-md overflow-hidden bg-muted">
                  <Image
                    src={content.image2.url}
                    alt="Image 2 preview"
                    fill
                    className="object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg'
                    }}
                  />
                </div>
              ) : (
                <div className="h-48 w-full border rounded-md bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No image selected</span>
                </div>
              )}
              <Input
                id="image2"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "image2")}
                disabled={isLoading}
              />
              {content.image2.fileName && (
                <p className="text-sm text-muted-foreground">
                  File: <span className="font-medium">{content.image2.fileName}</span>
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
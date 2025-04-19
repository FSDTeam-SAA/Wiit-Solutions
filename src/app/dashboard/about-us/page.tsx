"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

export default function EditableContent() {
  const [content, setContent] = useState({
    title: "Main Title",
    subtitle1: "First Subtitle",
    subtitle2: "Second Subtitle",
    description1: "This is the first description. You can edit this text to add your own content.",
    description2: "This is the second description. You can edit this text to add your own content.",
    image1: {
      url: "/placeholder.svg?height=300&width=400",
      fileName: "placeholder-image-1.svg",
    },
    image2: {
      url: "/placeholder.svg?height=300&width=400",
      fileName: "placeholder-image-2.svg",
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  // Log all data whenever content changes
  useEffect(() => {
    console.log("Current Content Data:", content)
  }, [content])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContent((prev) => {
      const newContent = { ...prev, [name]: value }
      console.log(`Updated ${name}:`, newContent)
      return newContent
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, imageKey: "image1" | "image2") => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setContent((prev) => {
        const newContent = {
          ...prev,
          [imageKey]: {
            url: imageUrl,
            fileName: file.name,
          },
        }
        console.log(`Updated ${imageKey}:`, {
          fileName: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          type: file.type,
        })
        return newContent
      })
    }
  }

  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token

  const handleSaveChanges = async () => {
    setIsLoading(true)
    console.log("Saving data...", content)

    try {
      const formData = new FormData()
      formData.append("title", content.title)
      formData.append("subtitle1", content.subtitle1)
      formData.append("subtitle2", content.subtitle2)
      formData.append("description1", content.description1)
      formData.append("description2", content.description2)

      // If your API accepts file uploads:
      const fileInput1 = document.getElementById("image1") as HTMLInputElement
      const fileInput2 = document.getElementById("image2") as HTMLInputElement

      if (fileInput1?.files?.[0]) {
        formData.append("image1", fileInput1.files[0])
      }

      if (fileInput2?.files?.[0]) {
        formData.append("image2", fileInput2.files[0])
      }

      const response = await axios.post("https://amit.scaleupdevagency.com/api/aboutus", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("All Content Data Saved:", response.data)
      toast.success("Content saved successfully!")
    } catch  {
      console.error("Error saving content:")
      toast.error("Failed to save content.")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-2xl font-bold">About Us Editor</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={content.title}
                onChange={handleChange}
                placeholder="Enter title"
                disabled={isLoading}
              />
              <div className="text-sm text-muted-foreground mt-1">
                Current value: <span className="font-medium">{content.title}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Label htmlFor="subtitle1">First Subtitle</Label>
              <Input
                id="subtitle1"
                name="subtitle1"
                value={content.subtitle1}
                onChange={handleChange}
                placeholder="Enter first subtitle"
                disabled={isLoading}
              />
              <div className="text-sm text-muted-foreground mt-1">
                Current value: <span className="font-medium">{content.subtitle1}</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="description1">First Description</Label>
              <Textarea
                id="description1"
                name="description1"
                value={content.description1}
                onChange={handleChange}
                placeholder="Enter first description"
                rows={4}
                disabled={isLoading}
              />
              <div className="text-sm text-muted-foreground mt-1">
                Current value: <span className="font-medium">{content.description1}</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="image1">First Image</Label>
              <div className="flex flex-col gap-2">
                <div className="relative h-48 w-full border rounded-md overflow-hidden bg-muted">
                  <Image
                    src={content.image1.url || "/placeholder.svg"}
                    alt="First image preview"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    id="image1"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "image1")}
                    disabled={isLoading}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  File name: <span className="font-medium">{content.image1.fileName}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Label htmlFor="subtitle2">Second Subtitle</Label>
              <Input
                id="subtitle2"
                name="subtitle2"
                value={content.subtitle2}
                onChange={handleChange}
                placeholder="Enter second subtitle"
                disabled={isLoading}
              />
              <div className="text-sm text-muted-foreground mt-1">
                Current value: <span className="font-medium">{content.subtitle2}</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="description2">Second Description</Label>
              <Textarea
                id="description2"
                name="description2"
                value={content.description2}
                onChange={handleChange}
                placeholder="Enter second description"
                rows={4}
                disabled={isLoading}
              />
              <div className="text-sm text-muted-foreground mt-1">
                Current value: <span className="font-medium">{content.description2}</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="image2">Second Image</Label>
              <div className="flex flex-col gap-2">
                <div className="relative h-48 w-full border rounded-md overflow-hidden bg-muted">
                  <Image
                    src={content.image2.url || "/placeholder.svg"}
                    alt="Second image preview"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    id="image2"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "image2")}
                    disabled={isLoading}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  File name: <span className="font-medium">{content.image2.fileName}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button type="button" className="w-full" onClick={handleSaveChanges} disabled={isLoading}>
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
  )
}

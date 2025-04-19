"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import QuillEditor from "../_components/quill-editor"

export default function EditableContent() {
  const [content, setContent] = useState({
    title: "Main Title",
    description1: "This is the first description. You can edit this text to add your own content.",
    description2: "This is the second description. You can edit this text to add your own content.",
    buttonText: "Click Here",
    buttonLink: "https://example.com",
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
        },
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", content.title)
      formData.append("description1", content.description1)
      formData.append("description2", content.description2)
      formData.append("buttonText", content.buttonText)
      formData.append("buttonLink", content.buttonLink)

      const fileInput1 = document.getElementById("image1") as HTMLInputElement
      const fileInput2 = document.getElementById("image2") as HTMLInputElement

      if (fileInput1?.files?.[0]) {
        formData.append("image1", fileInput1.files[0])
      }
      if (fileInput2?.files?.[0]) {
        formData.append("image2", fileInput2.files[0])
      }

      const response = await axios.post(
        "https://amit.scaleupdevagency.com/api/aboutus",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success("Content saved successfully!")
      console.log("Saved content:", response.data)
    } catch (error) {
      toast.error("Failed to save content.")
      console.error("Save error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-2xl font-bold">About Us Editor</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-6">
            {/* Title */}
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
            </div>

            {/* Description 1 */}
            <div className="space-y-2">
              <Label htmlFor="description1">Description 1</Label>
              <QuillEditor
                id="description1"
                value={content.description1}
                onChange={(val) => handleEditorChange("description1", val)}
              />
            </div>

            {/* Button Text & Link */}
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
                />
              </div>
            </div>

            {/* Image 1 */}
            <div className="space-y-2">
              <Label htmlFor="image1">Image Left</Label>
              <div className="relative h-48 w-full border rounded-md overflow-hidden bg-muted">
                <Image
                  src={content.image1.url}
                  alt="Image 1 preview"
                  fill
                  className="object-contain"
                />
              </div>
              <Input
                id="image1"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "image1")}
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                File name: <span className="font-medium">{content.image1.fileName}</span>
              </p>
            </div>

            {/* Description 2 */}
            <div className="space-y-2">
              <Label htmlFor="description2">Description 2</Label>
              <QuillEditor
                id="description2"
                value={content.description2}
                onChange={(val) => handleEditorChange("description2", val)}
              />
            </div>

            {/* Image 2 */}
            <div className="space-y-2">
              <Label htmlFor="image2">Image Right</Label>
              <div className="relative h-48 w-full border rounded-md overflow-hidden bg-muted">
                <Image
                  src={content.image2.url}
                  alt="Image 2 preview"
                  fill
                  className="object-contain"
                />
              </div>
              <Input
                id="image2"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "image2")}
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                File name: <span className="font-medium">{content.image2.fileName}</span>
              </p>
            </div>

            {/* Save Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}

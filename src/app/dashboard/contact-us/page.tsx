"use client"

import type React from "react"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { FileIcon, ImageIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

// Import Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[150px] border rounded-lg flex items-center justify-center">Loading Editor...</div>
  ),
})

// Editor component
const Editor = ({ value, onChange }: { value: string; onChange: (content: string) => void }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      }}
    />
  )
}

// Section type
type SectionData = {
  title: string
  subtitle: string
  keyBenefits: string
  editorContent: string
  image: File | null
}

type FormData = {
  title: string
  section1: SectionData
  section2: SectionData
}

type SectionKey = "section1" | "section2"

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    section1: {
      title: "",
      subtitle: "",
      keyBenefits: "",
      editorContent: "",
      image: null,
    },
    section2: {
      title: "",
      subtitle: "",
      keyBenefits: "",
      editorContent: "",
      image: null,
    },
  })

  const [imagePreview1, setImagePreview1] = useState<string | null>(null)
  const [imagePreview2, setImagePreview2] = useState<string | null>(null)
  const [fileName1, setFileName1] = useState<string>("")
  const [fileName2, setFileName2] = useState<string>("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    console.log("Form Data:", formData)
  }, [formData])

  const handleInputChange = (section: string, field: string, value: string) => {
    if (section === "main") {
      setFormData({
        ...formData,
        [field]: value,
      })
    } else {
      const sectionKey = section as SectionKey
      setFormData({
        ...formData,
        [sectionKey]: {
          ...formData[sectionKey],
          [field]: value,
        },
      })
    }
  }

  const handleEditorChange = (section: SectionKey, content: string) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        editorContent: content,
      },
    })
  }

  const handleImageChange = (section: SectionKey, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        const preview = event.target?.result as string

        if (section === "section1") {
          setImagePreview1(preview)
          setFileName1(file.name)
        } else {
          setImagePreview2(preview)
          setFileName2(file.name)
        }

        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            image: file,
          },
        }))
      }

      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    console.log("Submitting form data:", formData)
    // Send formData to backend here
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Title</h3>
            <Input
              placeholder="Write here"
              className="w-full"
              value={formData.title}
              onChange={(e) => handleInputChange("main", "title", e.target.value)}
            />
          </div>

          {/* Section 1 */}
          <div className="mb-8 p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-medium">Section 1</h3>
              <ImageIcon className="h-5 w-5 text-gray-500" />
            </div>

            <div className="mb-4">
              <div className="relative mb-4">
                <Input
                  type="file"
                  id="file-upload-1"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageChange("section1", e)}
                />
                <label
                  htmlFor="file-upload-1"
                  className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {imagePreview1 ? (
                    <div className="w-full">
                      <Image
                        src={imagePreview1 || "/placeholder.svg"}
                        alt="Preview"
                        className="max-h-48 mx-auto mb-2 object-contain"
                        width={300}
                        height={200}
                      />
                      <p className="text-center text-sm text-gray-500 break-all">{fileName1}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FileIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Click to upload image</p>
                    </div>
                  )}
                </label>
              </div>

              <p className="font-medium mb-1">Title</p>
              <Input
                placeholder="Write here"
                className="w-full mb-4"
                value={formData.section1.title}
                onChange={(e) => handleInputChange("section1", "title", e.target.value)}
              />

              <p className="font-medium mb-1">Subtitle</p>
              <Input
                placeholder="Write here"
                className="w-full mb-4"
                value={formData.section1.subtitle}
                onChange={(e) => handleInputChange("section1", "subtitle", e.target.value)}
              />

              <p className="font-medium mb-1">Key Benefits:</p>
              <Input
                placeholder="Write here"
                className="w-full mb-4"
                value={formData.section1.keyBenefits}
                onChange={(e) => handleInputChange("section1", "keyBenefits", e.target.value)}
              />

              <div className="mb-4">
                <p className="font-medium mb-1">Detailed Description:</p>
                <div className="min-h-[150px] border rounded-lg">
                  {isClient && (
                    <Editor
                      value={formData.section1.editorContent}
                      onChange={(content) => handleEditorChange("section1", content)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-8 p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-medium">Section 2</h3>
              <ImageIcon className="h-5 w-5 text-gray-500" />
            </div>

            <div className="mb-4">
              <div className="relative mb-4">
                <Input
                  type="file"
                  id="file-upload-2"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageChange("section2", e)}
                />
                <label
                  htmlFor="file-upload-2"
                  className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {imagePreview2 ? (
                    <div className="w-full">
                      <Image
                        src={imagePreview2 || "/placeholder.svg"}
                        alt="Preview"
                        className="max-h-48 mx-auto mb-2 object-contain"
                        width={300}
                        height={200}
                      />
                      <p className="text-center text-sm text-gray-500 break-all">{fileName2}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FileIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Click to upload image</p>
                    </div>
                  )}
                </label>
              </div>

              <p className="font-medium mb-1">Title</p>
              <Input
                placeholder="Write here"
                className="w-full mb-4"
                value={formData.section2.title}
                onChange={(e) => handleInputChange("section2", "title", e.target.value)}
              />

              <p className="font-medium mb-1">Subtitle</p>
              <Input
                placeholder="Write here"
                className="w-full mb-4"
                value={formData.section2.subtitle}
                onChange={(e) => handleInputChange("section2", "subtitle", e.target.value)}
              />

              <p className="font-medium mb-1">Key Benefits:</p>
              <Input
                placeholder="Write here"
                className="w-full mb-4"
                value={formData.section2.keyBenefits}
                onChange={(e) => handleInputChange("section2", "keyBenefits", e.target.value)}
              />

              <div className="mb-4">
                <p className="font-medium mb-1">Detailed Description:</p>
                <div className="min-h-[150px] border rounded-lg">
                  {isClient && (
                    <Editor
                      value={formData.section2.editorContent}
                      onChange={(content) => handleEditorChange("section2", content)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full md:w-auto" onClick={handleSubmit}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page

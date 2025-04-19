"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImagePlus, Loader2, Edit, Check } from 'lucide-react'
import Image from "next/image"
import dynamic from "next/dynamic"

// Dynamically import Quill with no SSR
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="border rounded-md p-3 min-h-[150px] flex items-center justify-center text-muted-foreground">
      Loading editor...
    </div>
  ),
})

export default function EditContentForm() {
  const [title, setTitle] = useState("My Awesome Project")
  const [subtitle, setSubtitle] = useState("A brief tagline goes here")
  const [description, setDescription] = useState(
    "<p>This is a detailed description of the project. You can write multiple paragraphs here.</p>",
  )
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [buttonText, setButtonText] = useState("Save Changes")
  const [isEditingButton, setIsEditingButton] = useState(false)
  const buttonEditRef = useRef<HTMLSpanElement>(null)

  // Flag to track if Quill is loaded
  const [quillLoaded, setQuillLoaded] = useState(false)

  // Handle direct button text editing
  const handleButtonTextEdit = () => {
    if (buttonEditRef.current) {
      const text = buttonEditRef.current.innerText.trim();
      if (text) {
        setButtonText(text);
      } else {
        // Reset to default if empty
        buttonEditRef.current.innerText = buttonText;
      }
    }
  }

  // Focus the editable span when editing mode is enabled
  useEffect(() => {
    if (isEditingButton && buttonEditRef.current) {
      buttonEditRef.current.focus();
    }
  }, [isEditingButton]);

  // Handle Quill loading
  useEffect(() => {
    // This will run only on the client side
    setQuillLoaded(true);
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setLogo(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('main_title', title);
    formData.append('sub_title_after_main_title', subtitle);
    formData.append('second_sub_title_content', description);
    if (logo) {
      formData.append('img', logo); // File object append করা হচ্ছে
    }
    formData.append('name', buttonText);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/home`, {
        method: "POST",
        headers: {
          // "Authorization": `Bearer ${}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
      } else {
        const errorResult = await response.json();
        console.error('Error submitting data:', errorResult);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleButtonEdit = () => {
    setIsEditingButton(!isEditingButton)
    if (!isEditingButton && buttonEditRef.current) {
      // When enabling edit mode, set the current text
      buttonEditRef.current.innerText = buttonText;
    }
  }

  return (
    <Card className="w-full h-screen mx-auto shadow-md">
      <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
        <CardTitle className="text-xl sm:text-2xl text-center">Edit Banner</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="title" className="text-sm sm:text-base">
              Main Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
              className="text-sm sm:text-base"
            />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="subtitle" className="text-sm sm:text-base">
              Sub Title
            </Label>
            <Input
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter subtitle"
              className="text-sm sm:text-base"
            />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="description" className="text-sm sm:text-base">
              Second Sub Title
            </Label>
            {/* Only render Quill when it's loaded on the client side */}
            {quillLoaded && (
              <div className="quill-wrapper">
                <ReactQuill
                  value={description}
                  onChange={setDescription}
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  className="min-h-[150px]"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo" className="text-sm sm:text-base">
              Logo
            </Label>
            <div className="flex flex-col items-center gap-3 sm:gap-4 sm:flex-row">
              <div className="flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-md border border-dashed">
                {logoPreview ? (
                  <Image
                    src={logoPreview || "/placeholder.svg"}
                    alt="Logo preview"
                    width={128}
                    height={128}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <ImagePlus className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 w-full">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="cursor-pointer w-full"
                />
              </div>
            </div>
          </div>

          {/* Button Text Editor - Direct Editing */}
          <div className="space-y-1 sm:space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="buttonText" className="text-sm sm:text-base">
                Button Text
              </Label>
              <Button type="button" variant="outline" size="sm" onClick={toggleButtonEdit} className="h-8 px-2 text-xs">
                {isEditingButton ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Done
                  </>
                ) : (
                  <>
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </>
                )}
              </Button>
            </div>
            <div className={`border rounded-md p-3 text-sm sm:text-base ${isEditingButton ? 'bg-muted/30 ring-2 ring-ring' : ''}`}>
              {isEditingButton ? (
                <span
                  ref={buttonEditRef}
                  contentEditable
                  onBlur={handleButtonTextEdit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleButtonTextEdit();
                      toggleButtonEdit();
                    }
                  }}
                  className="focus:outline-none block w-full"
                  suppressContentEditableWarning={true}
                >
                  {buttonText}
                </span>
              ) : (
                buttonText
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-4 sm:px-6 pb-4 sm:pb-6">
          <Button type="submit" className="w-[200px] text-sm sm:text-base py-2 sm:py-2.5" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                Saving changes...
              </>
            ) : (
              buttonText
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

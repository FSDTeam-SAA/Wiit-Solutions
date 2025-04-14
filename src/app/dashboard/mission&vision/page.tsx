"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Image from "next/image"

export default function MissionVisionEditor() {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        missionTitle: "Our Mission",
        mission: "Our mission is to empower businesses through innovative solutions.",
        visionTitle: "Our Vision",
        vision: "To become the leading provider of transformative technology services worldwide.",
      
    })

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImageFile(file)

            // Create preview URL
            const reader = new FileReader()
            reader.onload = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // Log all data including image file
            console.log("Form submitted:", {
                ...formData,
                image: imageFile
                    ? {
                        name: imageFile.name,
                        type: imageFile.type,
                        size: `${(imageFile.size / 1024).toFixed(2)} KB`,
                    }
                    : null,
            })

            // Here you would typically send the data to your backend
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full mx-auto p-4">
            <Card className="w-full">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl md:text-3xl">Company Information</CardTitle>
                    <CardDescription>Edit your company&apos;s mission, vision, and descriptions.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        {/* Mission Section */}
                        <div className="space-y-2">
                            <div className="mb-2">
                                <Label htmlFor="missionTitle" className="text-base font-medium mb-1 block">
                                    Section Title
                                </Label>
                                <Input
                                    id="missionTitle"
                                    name="missionTitle"
                                    value={formData.missionTitle}
                                    onChange={handleChange}
                                    placeholder="Enter section title..."
                                    disabled={isLoading}
                                    className="font-medium"
                                />
                            </div>
                            <Label htmlFor="mission" className="text-base font-medium">
                                Content
                            </Label>
                            <Textarea
                                id="mission"
                                name="mission"
                                value={formData.mission}
                                onChange={handleChange}
                                className="min-h-[100px]"
                                placeholder="Enter your company's mission..."
                                disabled={isLoading}
                            />
                        </div>

                        {/* Vision Section */}
                        <div className="space-y-2">
                            <div className="mb-2">
                                <Label htmlFor="visionTitle" className="text-base font-medium mb-1 block">
                                    Section Title
                                </Label>
                                <Input
                                    id="visionTitle"
                                    name="visionTitle"
                                    value={formData.visionTitle}
                                    onChange={handleChange}
                                    placeholder="Enter section title..."
                                    disabled={isLoading}
                                    className="font-medium"
                                />
                            </div>
                            <Label htmlFor="vision" className="text-base font-medium">
                                Content
                            </Label>
                            <Textarea
                                id="vision"
                                name="vision"
                                value={formData.vision}
                                onChange={handleChange}
                                className="min-h-[100px]"
                                placeholder="Enter your company's vision..."
                                disabled={isLoading}
                            />
                        </div>

                     

                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-base font-medium">
                                Company Image
                            </Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                <div className="space-y-2">
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        disabled={isLoading}
                                        className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-primary-foreground
                      hover:file:bg-primary/90
                      cursor-pointer disabled:opacity-50"
                                    />
                                    <p className="text-xs text-muted-foreground">Upload a company logo or relevant image</p>
                                </div>
                                <div className="border rounded-md overflow-hidden h-[150px] flex items-center justify-center bg-muted/30">
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview || "/placeholder.svg"}
                                            alt="Preview"
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-sm text-muted-foreground">Image preview</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end">
                        <Button type="submit" disabled={isLoading} className="min-w-[120px]">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

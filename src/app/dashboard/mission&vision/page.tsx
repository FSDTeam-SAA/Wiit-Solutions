"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

export default function MissionVisionEditor() {
    const { data: session } = useSession()
    const token = (session?.user as { token: string })?.token

    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        missionTitle: "Our Mission",
        mission: "Our mission is to empower businesses through innovative solutions.",
        visionTitle: "Our Vision",
        vision: "To become the leading provider of transformative technology services worldwide.",
    })

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    // Fetch initial data when component mounts
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/possible`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    if (data) {
                        setFormData(prev => ({
                            missionTitle: data.title1 || prev.missionTitle,
                            mission: data.title1_content || prev.mission,
                            visionTitle: data.title2 || prev.visionTitle,
                            vision: data.title2_content || prev.vision,
                        }))

                        if (data.img) {
                            // Check if the image URL is already complete or needs the backend URL prefix
                            const imageUrl = data.img.startsWith('http') 
                                ? data.img 
                                : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Possibles/${data.img}`
                            setImagePreview(imageUrl)
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching initial data:', error)
                toast.error('Failed to load mission/vision data')
            }
        }

        if (token) {
            fetchInitialData()
        }
    }, [token])

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
            const formDataToSend = new FormData()
            formDataToSend.append('title1', formData.missionTitle)
            formDataToSend.append('title1_content', formData.mission)
            formDataToSend.append('title2', formData.visionTitle)
            formDataToSend.append('title2_content', formData.vision)

            if (imageFile) {
                formDataToSend.append('img', imageFile)
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/possible`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to save data')
            }

            toast.success("Mission & Vision updated successfully!")
        } catch (error) {
            const err = error as Error
            console.error("Error submitting form:", err)
            toast.error(err.message || "Failed to update Mission & Vision")
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
                                <Label htmlFor="missionTitle">Mission Title</Label>
                                <Input
                                    id="missionTitle"
                                    name="missionTitle"
                                    value={formData.missionTitle}
                                    onChange={handleChange}
                                    placeholder="Enter mission title..."
                                    disabled={isLoading}
                                />
                            </div>
                            <Label htmlFor="mission">Mission Content</Label>
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
                                <Label htmlFor="visionTitle">Vision Title</Label>
                                <Input
                                    id="visionTitle"
                                    name="visionTitle"
                                    value={formData.visionTitle}
                                    onChange={handleChange}
                                    placeholder="Enter vision title..."
                                    disabled={isLoading}
                                />
                            </div>
                            <Label htmlFor="vision">Vision Content</Label>
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

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="image">Our Mission Image</Label>
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
                                    <p className="text-xs text-muted-foreground">
                                        {imageFile ? imageFile.name : imagePreview ? "Current image" : "No file selected"}
                                    </p>
                                </div>
                                <div className="border rounded-md overflow-hidden h-[150px] flex items-center justify-center bg-muted/30">
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            width={200}
                                            height={150}
                                            className="object-contain w-full h-full"
                                            unoptimized={imagePreview.startsWith('blob:')} // Needed for local blob URLs
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
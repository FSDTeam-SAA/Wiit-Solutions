"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface FormData {
    title: string
    description: string
    address: string
    addressDetails: string
    ourContact: string
    email: string
    phone: string
    buttonText: string
}

interface FileState {
    icon1: File | null
    icon2: File | null
    icon3: File | null
}

interface PreviewState {
    icon1: string | null
    icon2: string | null
    icon3: string | null
}

interface FileUploadProps {
    id: string
    file: File | null
    preview: string | null
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    label: string
}

const FileUploadWithPreview = ({ id, file, preview, onChange, label }: FileUploadProps) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
            id={id}
            name={id}
            type="file"
            accept="image/*"
            onChange={onChange}
        />
        {file && (
            <div className="mt-2">
                <p className="text-sm text-muted-foreground">File: {file.name}</p>
                {preview && (
                    <div className="mt-2 border rounded-md p-2 w-24 h-24">
                        <Image
                            src={preview}
                            width={100}
                            height={100}
                            alt={`${label} preview`}
                            className="w-full h-full object-contain"
                        />
                    </div>
                )}
            </div>
        )}
    </div>
)

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        address: "",
        addressDetails: "",
        ourContact: "",
        email: "",
        phone: "",
        buttonText: "",
    })

    const [files, setFiles] = useState<FileState>({
        icon1: null,
        icon2: null,
        icon3: null,
    })

    const [previews, setPreviews] = useState<PreviewState>({
        icon1: null,
        icon2: null,
        icon3: null,
    })

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fileKey: keyof FileState) => {
        const file = e.target.files?.[0]
        if (file) {
            setFiles((prev) => ({ ...prev, [fileKey]: file }))
            const previewUrl = URL.createObjectURL(file)
            setPreviews((prev) => ({ ...prev, [fileKey]: previewUrl }))
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const allData = {
                ...formData,
                files: {
                    icon1: files.icon1 ? files.icon1.name : null,
                    icon2: files.icon2 ? files.icon2.name : null,
                    icon3: files.icon3 ? files.icon3.name : null,
                },
            }

            console.log("Form submission data:", allData)

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <Card className="w-full mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">Contact Information Form</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Basic Information</h3>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="min-h-[100px]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Address Information</h3>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <FileUploadWithPreview
                                    id="icon1"
                                    file={files.icon1}
                                    preview={previews.icon1}
                                    onChange={(e) => handleFileChange(e, "icon1")}
                                    label="Icon"
                                />

                                <div className="space-y-2">
                                    <Label htmlFor="addressDetails">Address Details</Label>
                                    <Input
                                        id="addressDetails"
                                        name="addressDetails"
                                        placeholder="Address details"
                                        value={formData.addressDetails}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Contact Information</h3>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="ourContact">Our Contact</Label>
                                    <Input
                                        id="ourContact"
                                        name="ourContact"
                                        placeholder="Our contact"
                                        value={formData.ourContact}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <FileUploadWithPreview
                                    id="icon2"
                                    file={files.icon2}
                                    preview={previews.icon2}
                                    onChange={(e) => handleFileChange(e, "icon2")}
                                    label="Email Icon"
                                />

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        placeholder="Phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <FileUploadWithPreview
                                    id="icon3"
                                    file={files.icon3}
                                    preview={previews.icon3}
                                    onChange={(e) => handleFileChange(e, "icon3")}
                                    label="Phone Icon"
                                />

                                <div className="space-y-2">
                                    <Label htmlFor="buttonText">Button Text</Label>
                                    <Input
                                        id="buttonText"
                                        name="buttonText"
                                        placeholder="Button text"
                                        value={formData.buttonText}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <CardFooter className="px-0 pt-6">
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Form"
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

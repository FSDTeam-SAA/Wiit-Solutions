"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, X } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import "react-quill/dist/quill.snow.css"

// ✅ Properly type ReactQuill for use with JSX
const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
}) as unknown as React.ComponentType<{
    value: string
    onChange: (value: string) => void
    theme?: string
    placeholder?: string
    className?: string
}>

// ✅ Type-safe FormData structure
interface FormDataType {
    mainTitle: string
    subtitle: string
    [key: string]: string | File | null
}

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormDataType>({
        mainTitle: "",
        subtitle: "",
        section1Image: null,
        section1ImagePreview: null,
        section1Title: "",
        section1Content: "",
        section2Image: null,
        section2ImagePreview: null,
        section2Title: "",
        section2Content: "",
        section3Image: null,
        section3ImagePreview: null,
        section3Title: "",
        section3Content: "",
        section4Image: null,
        section4ImagePreview: null,
        section4Title: "",
        section4Content: "",
        section5Image: null,
        section5ImagePreview: null,
        section5Title: "",
        section5Content: "",
    })

    useEffect(() => {
        return () => {
            Object.keys(formData).forEach((key) => {
                if (key.includes("Preview") && typeof formData[key] === "string") {
                    URL.revokeObjectURL(formData[key] as string)
                }
            })
        }
    }, [formData])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target

        if (files && files.length > 0) {
            const previewUrl = URL.createObjectURL(files[0])
            const previewName = `${name}Preview`

            if (typeof formData[previewName] === "string") {
                URL.revokeObjectURL(formData[previewName] as string)
            }

            setFormData({
                ...formData,
                [name]: files[0],
                [previewName]: previewUrl,
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }

    const handleQuillChange = (value: string, name: string) => {
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleRemoveImage = (sectionName: string) => {
        const imageName = `${sectionName}Image`
        const previewName = `${sectionName}ImagePreview`

        if (typeof formData[previewName] === "string") {
            URL.revokeObjectURL(formData[previewName] as string)
        }

        setFormData({
            ...formData,
            [imageName]: null,
            [previewName]: null,
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const submitData = new FormData()

        Object.keys(formData).forEach((key) => {
            if (!key.includes("Preview") && formData[key] !== null) {
                submitData.append(key, formData[key] as string | Blob)
            }
        })

        console.log("Form submitted:", formData)

        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    interface SectionComponentProps {
        number: number
        data: FormDataType
    }

    const SectionComponent = ({ number, data }: SectionComponentProps) => {
        const sectionName = `section${number}`
        const imageKey = `${sectionName}Image`
        const previewKey = `${sectionName}ImagePreview`
        const titleKey = `${sectionName}Title`
        const contentKey = `${sectionName}Content`

        return (
            <div className="p-6 bg-white rounded-lg shadow-sm border">
                <h4 className="text-lg font-medium mb-4">Section-{number}</h4>

                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Upload Image</p>

                    {data[previewKey] ? (
                        <div className="relative mb-4">
                            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                                <Image
                                    src={data[previewKey] as string}
                                    alt={`Section ${number} preview`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                                onClick={() => handleRemoveImage(sectionName)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <Input
                            type="file"
                            name={imageKey}
                            onChange={handleInputChange}
                            className="mb-4"
                            accept="image/*"
                        />
                    )}
                </div>

                <p className="text-sm text-gray-600 mb-2">Title</p>
                <Input
                    placeholder="Title"
                    name={titleKey}
                    value={(data[titleKey] as string) || ""}
                    onChange={handleInputChange}
                    className="mb-4"
                />

                <p className="text-sm text-gray-600 mb-2">Content</p>
                <div className="mb-4">
                    <ReactQuill
                        theme="snow"
                        value={(data[contentKey] as string) || ""}
                        onChange={(value) => handleQuillChange(value, contentKey)}
                        placeholder="Write your content here..."
                        className="min-h-[200px]"
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="p-6 bg-white rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold mb-4">Title</h3>
                    <Input
                        placeholder="Title"
                        name="mainTitle"
                        value={formData.mainTitle}
                        onChange={handleInputChange}
                        className="mb-4"
                    />
                    <p className="text-sm text-gray-600 mb-2">Subtitle</p>
                    <Input
                        placeholder="Subtitle"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleInputChange}
                        className="mb-4"
                    />
                </div>

                {[1, 2, 3, 4, 5].map((num) => (
                    <SectionComponent key={num} number={num} data={formData} />
                ))}

                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading} className="min-w-[120px]">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}

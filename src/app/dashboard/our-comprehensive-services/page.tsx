"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import QuillEditor from '../_components/quill-editor'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

interface FormData {
    title: string
    subtitle: string
    title1: string
    content1: string
    title2: string
    content2: string
    title3: string
    content3: string
    title4: string
    content4: string
    title5: string
    content5: string
}

interface FormErrors {
    [key: string]: string
}

export default function ComprehensiveServiceForm() {
    const { data: session } = useSession()
    const token = (session?.user as { token: string })?.token
    console.log(token)

    const [content, setContent] = useState<FormData>({
        title: '',
        subtitle: '',
        title1: '',
        content1: '',
        title2: '',
        content2: '',
        title3: '',
        content3: '',
        title4: '',
        content4: '',
        title5: '',
        content5: ''
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const imgRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ]

    const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([null, null, null, null, null])
    const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null, null, null])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ourcomprensive`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await res.json()
                if (data.success) {
                    const {
                        title,
                        subtitle,
                        title1,
                        content1,
                        title2,
                        content2,
                        title3,
                        content3,
                        title4,
                        content4,
                        title5,
                        content5,
                        img1,
                        img2,
                        img3,
                        img4,
                        img5
                    } = data.data
                    setContent({
                        title,
                        subtitle,
                        title1,
                        content1,
                        title2,
                        content2,
                        title3,
                        content3,
                        title4,
                        content4,
                        title5,
                        content5
                    })

                    // Set image previews with full URLs
                    setImagePreviews([
                        img1 ? `${img1}` : null,
                        img2 ? `${img2}` : null,
                        img3 ? `${img3}` : null,
                        img4 ? `${img4}` : null,
                        img5 ? `${img5}` : null
                    ])
                }
            } catch (err) {
                console.error('Failed to fetch existing data:', err)
                setErrorMessage('Failed to load existing data')
            }
        }
        if (token) fetchData()
    }, [token])

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            setErrors(prev => ({ ...prev, [`img${index + 1}`]: 'Please upload an image file' }))
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, [`img${index + 1}`]: 'Image size should be less than 2MB' }))
            return
        }

        // Create preview URL
        const previewUrl = URL.createObjectURL(file)
        
        // Update states
        setImagePreviews(prev => {
            const newPreviews = [...prev]
            newPreviews[index] = previewUrl
            return newPreviews
        })

        setImageFiles(prev => {
            const newFiles = [...prev]
            newFiles[index] = file
            return newFiles
        })

        // Clear any previous error
        setErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors[`img${index + 1}`]
            return newErrors
        })
    }

    const handleEditorChange = (field: keyof FormData, value: string) => {
        setContent(prev => ({ ...prev, [field]: value }))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setContent(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSuccessMessage('')
        setErrorMessage('')

        try {
            const formData = new FormData()

            // Append all content fields
            Object.entries(content).forEach(([key, value]) => {
                formData.append(key, value)
            })

            // Append image files if they exist
            imageFiles.forEach((file, index) => {
                if (file) {
                    formData.append(`img${index + 1}`, file)
                }
            })

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ourcomprensive`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })

            const result = await res.json()

            if (result.success) {
                setSuccessMessage(result.message)
                // Clear file inputs after successful submission
                setImageFiles([null, null, null, null, null])
                imgRefs.forEach(ref => {
                    if (ref.current) ref.current.value = ''
                })
            } else {
                throw new Error(result.message || 'Submission failed')
            }
        } catch {
            console.error('Submission error:')
            setErrorMessage( 'Failed to save content')
        } finally {
            setIsSubmitting(false)
        }
    }

    const renderSection = (index: number) => {
        const sectionNumber = index + 1
        return (
            <div className="mb-8" key={sectionNumber}>
                <div className="space-y-2 mb-4">
                    <Label htmlFor={`img${sectionNumber}`}>Upload image for section {sectionNumber}</Label>
                    <input
                        type="file"
                        id={`img${sectionNumber}`}
                        ref={imgRefs[index]}
                        onChange={(e) => handleImageChange(e, index)}
                        accept="image/*"
                        className="hidden"
                    />
                    <div
                        onClick={() => imgRefs[index].current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
                    >
                        {imagePreviews[index] ? (
                            <>
                                <Image
                                    src={imagePreviews[index]}
                                    alt={`Section ${sectionNumber} Preview`}
                                    className="max-h-40 mx-auto object-contain"
                                    width={200}
                                    height={200}
                                />
                                <p className="text-sm text-gray-500">Click to change image</p>
                            </>
                        ) : (
                            <div className="py-4 flex flex-col items-center">
                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">Click to upload image</p>
                            </div>
                        )}
                    </div>
                    {errors[`img${sectionNumber}`] && (
                        <p className="text-sm text-red-500 mt-1">{errors[`img${sectionNumber}`]}</p>
                    )}
                </div>

                <div className="mb-4">
                    <Label htmlFor={`title${sectionNumber}`}>Title {sectionNumber}</Label>
                    <Input
                        type="text"
                        name={`title${sectionNumber}`}
                        id={`title${sectionNumber}`}
                        value={content[`title${sectionNumber}` as keyof FormData]}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor={`content${sectionNumber}`}>Content {sectionNumber}</Label>
                    <QuillEditor
                        id={`content${sectionNumber}`}
                        value={content[`content${sectionNumber}` as keyof FormData]}
                        onChange={(val) => handleEditorChange(`content${sectionNumber}` as keyof FormData, val)}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8">
            <form onSubmit={handleSubmit}>
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="title">Main Title</Label>
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            value={content.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="subtitle">Subtitle</Label>
                        <Input
                            type="text"
                            name="subtitle"
                            id="subtitle"
                            value={content.subtitle}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {[0, 1, 2, 3, 4].map((index) => renderSection(index))}

                {successMessage && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                        {errorMessage}
                    </div>
                )}

                <div className="mt-8">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Content'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
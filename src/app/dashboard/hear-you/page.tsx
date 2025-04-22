"use client"

import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useSession } from "next-auth/react"

interface FormData {
    main_title: string
    sub_title: string
    address_our_address_section: string
    title_our_address_section: string
    title_our_contact_section: string
    mail_address_our_contact_section: string
    phone_number_our_contact_section: string
    copyright: string
}

interface FileState {
    breadcrumb: File | null
    icon_our_address_section: File | null
    mail_icon_our_contact_section: File | null
    icon_our_contact_section: File | null
}

interface PreviewState {
    breadcrumb: string | null
    icon_our_address_section: string | null
    mail_icon_our_contact_section: string | null
    icon_our_contact_section: string | null
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
        {file && (
            <p className="text-sm text-muted-foreground">New file: {file.name}</p>
        )}
    </div>
)

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        main_title: "",
        sub_title: "",
        address_our_address_section: "",
        title_our_address_section: "",
        title_our_contact_section: "",
        mail_address_our_contact_section: "",
        phone_number_our_contact_section: "",
        copyright: "",
    })

    const [files, setFiles] = useState<FileState>({
        breadcrumb: null,
        icon_our_address_section: null,
        mail_icon_our_contact_section: null,
        icon_our_contact_section: null,
    })

    const [previews, setPreviews] = useState<PreviewState>({
        breadcrumb: null,
        icon_our_address_section: null,
        mail_icon_our_contact_section: null,
        icon_our_contact_section: null,
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

    const { data: session } = useSession()
    const token = (session?.user as { token: string })?.token

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const json = await res.json();

                if (json.success) {
                    const data = json.data;
                    setFormData({
                        main_title: data.main_title || "",
                        sub_title: data.sub_title || "",
                        address_our_address_section: data.address_our_address_section || "",
                        title_our_address_section: data.title_our_address_section || "",
                        title_our_contact_section: data.title_our_contact_section || "",
                        mail_address_our_contact_section: data.mail_address_our_contact_section || "",
                        phone_number_our_contact_section: data.phone_number_our_contact_section || "",
                        copyright: data.copyright || "",
                    });

                    setPreviews({
                        breadcrumb: data.breadcrumb || null,
                        icon_our_address_section: data.icon_our_address_section || null,
                        mail_icon_our_contact_section: data.mail_icon_our_contact_section || null,
                        icon_our_contact_section: data.icon_our_contact_section || null,
                    });
                }
            } catch (err) {
                console.error("Failed to fetch contact data:", err);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = new FormData();
            
            // Append all form data
            Object.entries(formData).forEach(([key, value]) => {
                payload.append(key, value);
            });

            // Append all files if they exist
            Object.entries(files).forEach(([key, file]) => {
                if (file) {
                    payload.append(key, file);
                }
            });

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`, {
                method: "POST",
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                body: payload,
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to update contact information");
            }
            
            console.log("Success:", data);
            // Optionally show success message to user
        } catch (error) {
            console.error("Error submitting form:", error);
            // Optionally show error message to user
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="py-10 px-4">
            <Card className="w-full mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">Contact Information Form</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Breadcrumb Image */}
                        <FileUploadWithPreview
                            id="breadcrumb"
                            label="Breadcrumb Image"
                            file={files.breadcrumb}
                            preview={previews.breadcrumb}
                            onChange={(e) => handleFileChange(e, 'breadcrumb')}
                        />

                        {/* Main Title */}
                        <div className="space-y-2">
                            <Label htmlFor="main_title">Main Title</Label>
                            <Input
                                id="main_title"
                                name="main_title"
                                placeholder="Main Title"
                                value={formData.main_title}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Sub Title */}
                        <div className="space-y-2">
                            <Label htmlFor="sub_title">Sub Title</Label>
                            <Textarea
                                id="sub_title"
                                name="sub_title"
                                placeholder="Sub Title"
                                value={formData.sub_title}
                                onChange={handleInputChange}
                                className="min-h-[100px]"
                            />
                        </div>

                        {/* Address Section */}
                        <div className="space-y-4 border-t pt-4">
                            <h3 className="text-lg font-medium">Address Section</h3>
                            
                            <FileUploadWithPreview
                                id="icon_our_address_section"
                                label="Address Icon"
                                file={files.icon_our_address_section}
                                preview={previews.icon_our_address_section}
                                onChange={(e) => handleFileChange(e, 'icon_our_address_section')}
                            />

                            <div className="space-y-2">
                                <Label htmlFor="title_our_address_section">Address Section Title</Label>
                                <Input
                                    id="title_our_address_section"
                                    name="title_our_address_section"
                                    placeholder="Address Section Title"
                                    value={formData.title_our_address_section}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address_our_address_section">Address</Label>
                                <Input
                                    id="address_our_address_section"
                                    name="address_our_address_section"
                                    placeholder="Address"
                                    value={formData.address_our_address_section}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="space-y-4 border-t pt-4">
                            <h3 className="text-lg font-medium">Contact Section</h3>
                            
                            <FileUploadWithPreview
                                id="icon_our_contact_section"
                                label="Contact Icon"
                                file={files.icon_our_contact_section}
                                preview={previews.icon_our_contact_section}
                                onChange={(e) => handleFileChange(e, 'icon_our_contact_section')}
                            />

                            <FileUploadWithPreview
                                id="mail_icon_our_contact_section"
                                label="Mail Icon"
                                file={files.mail_icon_our_contact_section}
                                preview={previews.mail_icon_our_contact_section}
                                onChange={(e) => handleFileChange(e, 'mail_icon_our_contact_section')}
                            />

                            <div className="space-y-2">
                                <Label htmlFor="title_our_contact_section">Contact Section Title</Label>
                                <Input
                                    id="title_our_contact_section"
                                    name="title_our_contact_section"
                                    placeholder="Contact Section Title"
                                    value={formData.title_our_contact_section}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mail_address_our_contact_section">Email Address</Label>
                                <Input
                                    id="mail_address_our_contact_section"
                                    name="mail_address_our_contact_section"
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.mail_address_our_contact_section}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone_number_our_contact_section">Phone Number</Label>
                                <Input
                                    id="phone_number_our_contact_section"
                                    name="phone_number_our_contact_section"
                                    placeholder="Phone Number"
                                    value={formData.phone_number_our_contact_section}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="space-y-2">
                            <Label htmlFor="copyright">Copyright Text</Label>
                            <Input
                                id="copyright"
                                name="copyright"
                                placeholder="Copyright Text"
                                value={formData.copyright}
                                onChange={handleInputChange}
                            />
                        </div>

                        <CardFooter className="px-0 pt-6">
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? (
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
                </CardContent>
            </Card>
        </div>
    )
}
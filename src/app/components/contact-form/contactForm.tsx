import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface FormData {
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phone: string;
    message: string;
}

function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        phone: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contactMessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    company_name: formData.companyName,
                    email_address: formData.email,
                    phone_number: formData.phone,
                    comments: formData.message,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Submission failed:", errorData);
                toast.error("There was an issue submitting the form. Please try again.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }

            const result = await res.json();
            console.log("Form successfully submitted:", result);

            toast.success("Thank you for reaching out! We appreciate your message and will get back to you shortly.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Reset form
            setFormData({
                firstName: "",
                lastName: "",
                companyName: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("An unexpected error occurred. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            <div>
                <input
                    type="text"
                    name="firstName"
                    placeholder="*First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="phone"
                    placeholder="*Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="lastName"
                    placeholder="*Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
                />
            </div>
            <div className="md:row-span-2">
                <textarea
                    name="message"
                    placeholder="*Comments/Questions"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="italic w-full h-full p-3 bg-white text-black border border-gray-300 rounded-sm min-h-[104px]"
                ></textarea>
            </div>
            <div>
                <input
                    type="text"
                    name="companyName"
                    placeholder="*Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
                />
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="*Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
                />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-3 ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500"
                        } text-white font-medium transition-colors duration-200 rounded-sm`}
                >
                    {loading ? "Sending..." : "Submit"}
                </button>
            </div>
        </form>
    );
}

export default ContactForm;
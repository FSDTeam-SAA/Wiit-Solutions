import React, { useState } from 'react'

function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Add your form submission logic here
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
                    className="w-full p-3 bg-blue-400 hover:bg-blue-500 text-white font-medium transition-colors duration-200 rounded-sm"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default ContactForm
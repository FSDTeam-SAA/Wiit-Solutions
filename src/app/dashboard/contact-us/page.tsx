"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QuillEditor from "../_components/quill-editor";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface WhyChooseUsData {
  main_title: string;
  img: string;
  icon: string;
  left_side_main_title: string;
  left_side_comments: string;
  left_side_icon: string;
  left_side_key_title: string;
  left_side_content: string;
  middle_side_main_title: string;
  middle_side_comments: string;
  middle_side_icon: string;
  middle_side_key_title: string;
  middle_side_content: string;
}



const WhyChooseUsEditor = () => {
  const [formData, setFormData] = useState<WhyChooseUsData>({
    main_title: "",
    img: "",
    icon: "",
    left_side_main_title: "",
    left_side_comments: "",
    left_side_icon: "",
    left_side_key_title: "",
    left_side_content: "",
    middle_side_main_title: "",
    middle_side_comments: "",
    middle_side_icon: "",
    middle_side_key_title: "",
    middle_side_content: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [leftIconPreview, setLeftIconPreview] = useState<string | null>(null);
  const [middleIconPreview, setMiddleIconPreview] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (field: keyof WhyChooseUsData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditorChange = (field: keyof WhyChooseUsData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof WhyChooseUsData
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    // Set the appropriate preview state
    switch (key) {
      case 'img':
        setMainImagePreview(previewUrl);
        break;
      case 'icon':
        setIconPreview(previewUrl);
        break;
      case 'left_side_icon':
        setLeftIconPreview(previewUrl);
        break;
      case 'middle_side_icon':
        setMiddleIconPreview(previewUrl);
        break;
    }

    // Store the file name in form data
    setFormData((prev) => ({ ...prev, [key]: file.name }));
  };




  const { data: session } = useSession()
  const token = (session?.user as { token: string })?.token


  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/whychooseus`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();

        if (json.success) {
          const data = json.data;
          console.log("API Response Data:", data);
          setFormData({
            main_title: data.main_title || "",
            img: data.img || "",
            icon: data.icon || "",
            left_side_main_title: data.left_side_main_title || "",
            left_side_comments: data.left_side_comments || "",
            left_side_icon: data.left_side_icon || "",
            left_side_key_title: data.left_side_key_title || "",
            left_side_content: data.left_side_content || "",
            middle_side_main_title: data.middle_side_main_title || "",
            middle_side_comments: data.middle_side_comments || "",
            middle_side_icon: data.middle_side_icon || "",
            middle_side_key_title: data.middle_side_key_title || "",
            middle_side_content: data.middle_side_content || "",
          });

          // Preview images
          setMainImagePreview(data.img ? `${data.img}` : null);
          setIconPreview(data.icon ? `${data.icon}` : null);
          setLeftIconPreview(data.left_side_icon ? `${data.left_side_icon}` : null);
          setMiddleIconPreview(data.middle_side_icon ? `${data.middle_side_icon}` : null);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");
    setErrorMessage("");

    const validationErrors: { [key: string]: string } = {};
    if (!formData.main_title) validationErrors.main_title = "Main title is required.";
    if (!formData.img) validationErrors.img = "Main image is required.";
    if (!formData.icon) validationErrors.icon = "Icon is required.";
    if (!formData.left_side_icon) validationErrors.left_side_icon = "Left icon is required.";
    if (!formData.middle_side_icon) validationErrors.middle_side_icon = "Middle icon is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const formPayload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (!['img', 'icon', 'left_side_icon', 'middle_side_icon'].includes(key)) {
          formPayload.append(key, value);
        }
      });

      const fileInputs = document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>;
      fileInputs.forEach(input => {
        if (input.files?.[0]) {
          formPayload.append(input.name, input.files[0]);
        }
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/whychooseus`, {
        method: "POST",
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: formPayload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      setSuccessMessage("Saved successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "Submission failed.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }

    console.log("Form submitted:", formData);
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-10">
      <div>
        <Label className="text-2xl">Main Title</Label>
        <Input
          value={formData.main_title}
          onChange={(e) => handleInputChange("main_title", e.target.value)}
        />
        {errors.main_title && <p className="text-red-500">{errors.main_title}</p>}
      </div>

      <div>
        <Label className=" text-2xl">Main Image</Label>
        <Input
          type="file"
          name="img"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "img")}
        />
        {mainImagePreview && (
          <Image src={mainImagePreview} alt="Preview" width={40} height={40} className="mt-2 w-40 h-auto" />
        )}
        {errors.img && <p className="text-red-500">{errors.img}</p>}
      </div>

      <div>
        <Label>Icon</Label>
        <Input
          type="file"
          name="icon"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "icon")}
        />
        {iconPreview && <Image src={iconPreview} alt="Preview" width={20} height={20} className="mt-2 w-20 h-20" />}
        {errors.icon && <p className="text-red-500">{errors.icon}</p>}
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-4">Left Side Content</h3>

        <div className="space-y-4">
          <div>
            <Label>Main Title</Label>
            <Input
              value={formData.left_side_main_title}
              onChange={(e) => handleInputChange("left_side_main_title", e.target.value)}
            />
          </div>

          <div>
            <Label>Comments</Label>
            <Input
              value={formData.left_side_comments}
              onChange={(e) => handleInputChange("left_side_comments", e.target.value)}
            />
          </div>

          <div>
            <Label>Key Title</Label>
            <Input
              value={formData.left_side_key_title}
              onChange={(e) => handleInputChange("left_side_key_title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <QuillEditor
              id="left_side_content"
              value={formData.left_side_content}
              onChange={(val) => handleEditorChange("left_side_content", val)}
            />
          </div>

          <div>
            <Label>Icon</Label>
            <Input
              type="file"
              name="left_side_icon"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "left_side_icon")}
            />
            {leftIconPreview && <Image src={leftIconPreview} alt="Preview" width={200} height={200} className="mt-2 w-20 h-20" />}
            {errors.left_side_icon && <p className="text-red-500">{errors.left_side_icon}</p>}
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-4">Middle Side Content</h3>

        <div className="space-y-4">
          <div>
            <Label>Main Title</Label>
            <Input
              value={formData.middle_side_main_title}
              onChange={(e) => handleInputChange("middle_side_main_title", e.target.value)}
            />
          </div>

          <div>
            <Label>Comments</Label>
            <Input
              value={formData.middle_side_comments}
              onChange={(e) => handleInputChange("middle_side_comments", e.target.value)}
            />
          </div>

          <div>
            <Label>Key Title</Label>
            <Input
              value={formData.middle_side_key_title}
              onChange={(e) => handleInputChange("middle_side_key_title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <QuillEditor
              id="middle_side_content"
              value={formData.middle_side_content}
              onChange={(val) => handleEditorChange("middle_side_content", val)}
            />
          </div>

          <div>
            <Label>Icon</Label>
            <Input
              type="file"
              name="middle_side_icon"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "middle_side_icon")}
            />
            {middleIconPreview && (
              <Image src={middleIconPreview} alt="Preview" width={200} height={200} className="mt-2 w-20 h-20" />
            )}
            {errors.middle_side_icon && (
              <p className="text-red-500">{errors.middle_side_icon}</p>
            )}
          </div>
        </div>
      </div>
      {/* ✅ Show success or error messages */}
      {successMessage && <p className="text-green-600 font-medium">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 font-medium">{errorMessage}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default WhyChooseUsEditor;
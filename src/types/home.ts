export type HomePageData = {
    banner: BannerSection; // Assuming it's empty for now, adjust when populated
    possible: PossibleSection[];
    whychooseus: WhyChooseUsSection[];
    about: AboutSection[];
    contact: ContactSection[];
    menu: MenuSection[];
    // ourcorevalue: any[]; // Also currently empty
    service: ServiceSection[];
};

export type PossibleSection = {
    id: number;
    img: string;
    title1: string;
    title1_content: string;
    title2: string;
    title2_content: string;
    created_at: string;
    updated_at: string;
};

export type BannerSection = {
    id: number;
    title: string;
    subtitle: string;
    description: string; // HTML content in string format
    logo: string;        // image file name (e.g., banner logo)
    button_text: string;
    button_link: string;
    back_img: string;    // image file name (e.g., background image)
    created_at: string;  // ISO date string
    updated_at: string;  // ISO date string
  };

export type WhyChooseUsSection = {
    id: number;
    main_title: string;
    left_side_main_title: string;
    left_side_icon: string;
    left_side_comments: string;
    left_side_key_title: string;
    left_side_content: string;
    middle_side_main_title: string;
    middle_side_icon: string;
    middle_side_comments: string;
    middle_side_key_title: string;
    middle_side_content: string;
    img: string;
    icon: string;
    created_at: string;
    updated_at: string;
};

export type AboutSection = {
    id: number;
    main_title: string;
    img1: string;
    img2: string;
    first_paragraph_subtitle: string;
    first_paragraph_content: string;
    second_paragraph_subtitle: string;
    second_paragraph_content: string;
    name: string;
    link: string;
    created_at: string;
    updated_at: string;
};

export type ContactSection = {
    id: number;
    breadcrumb: string;
    main_title: string;
    sub_title: string;
    title_our_address_section: string;
    icon_our_address_section: string;
    address_our_address_section: string;
    title_our_contact_section: string;
    mail_icon_our_contact_section: string;
    mail_address_our_contact_section: string;
    icon_our_contact_section: string;
    phone_number_our_contact_section: string;
    copyright: string;
    created_at: string;
    updated_at: string;
};

export type MenuSection = {
    id: number;
    name1: string;
    link1: string;
    name2: string;
    link2: string;
    name3: string;
    link3: string;
    name4: string;
    link4: string;
    logo: string;
    created_at: string;
    updated_at: string;
};

export type ServiceSection = {
    id: number;
    main_title: string;
    subtitle1: string;
    description1: string;
    icon1: string;
    subtitle2: string;
    description2: string;
    icon2: string;
    subtitle3: string;
    description3: string;
    icon3: string;
    subtitle4: string;
    description4: string;
    icon4: string;
    img: string;
    created_at: string;
    updated_at: string;
};

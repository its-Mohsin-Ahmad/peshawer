import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Property,
  Project,
  HeroSlide,
  PageHero,
  Inquiry,
  Appointment,
  ContactMessage,
  BlogPost,
  Testimonial,
  SiteSettings,
  AuditLog,
  ApartmentPlan,
} from '../types';
import {
  initialProperties,
  initialProjects,
  initialHeroSlides,
  initialPageHeroes,
  initialInquiries,
  initialAppointments,
  initialMessages,
  initialBlogPosts,
  initialTestimonials,
  initialSiteSettings,
} from '../data/initialData';

interface DataContextType {
  properties: Property[];
  projects: Project[];
  heroSlides: HeroSlide[];
  pageHeroes: Record<string, PageHero>;
  inquiries: Inquiry[];
  appointments: Appointment[];
  messages: ContactMessage[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  settings: SiteSettings;
  auditLogs: AuditLog[];

  // Property Actions
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;

  // Project Actions
  updateProject: (id: string, updates: Partial<Project>) => void;
  updateTownGardenVideo: (videoData: {
    videoUrl?: string;
    videoPoster?: string;
    videoTitle?: string;
    videoDescription?: string;
    hasVideo?: boolean;
  }) => void;

  // Apartment & Payment Plan Actions
  addApartmentToProject: (projectId: string, apt: Omit<ApartmentPlan, 'id'>) => void;
  updateApartment: (projectId: string, apartmentId: string, updates: Partial<ApartmentPlan>) => void;
  deleteApartment: (projectId: string, apartmentId: string) => void;

  // Hero Management
  updateHeroSlide: (id: string, updates: Partial<HeroSlide>) => void;
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  deleteHeroSlide: (id: string) => void;
  updatePageHero: (path: string, updates: Partial<PageHero>) => void;

  // Inquiries & Forms
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status'], notes?: string) => void;
  deleteInquiry: (id: string) => void;

  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;

  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => void;
  markMessageAsRead: (id: string) => void;

  // Blogs
  addBlog: (blog: Omit<BlogPost, 'id' | 'publishedAt'>) => void;
  updateBlog: (id: string, updates: Partial<BlogPost>) => void;
  deleteBlog: (id: string) => void;

  // Testimonials
  addTestimonial: (test: Omit<Testimonial, 'id' | 'date'>) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;

  // Settings
  updateSettings: (updates: Partial<SiteSettings>) => void;

  // Reset to default
  resetAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = 'PESHAWER_REAL_ESTATE_V5_STORE';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    // Clean out legacy V4 store which contained old leftover mock cards
    try {
      localStorage.removeItem('PESHAWER_REAL_ESTATE_V4_STORE_PROPERTIES');
    } catch {
      // ignore
    }
    const validIds = new Set(initialProperties.map((p) => p.id));
    const saved = localStorage.getItem(`${STORAGE_KEY}_PROPERTIES`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Property[];
        const filtered = parsed.filter((p) => validIds.has(p.id) || p.id.startsWith('custom-'));
        if (filtered.length > 0) return filtered;
      } catch (e) {
        console.error(e);
      }
    }
    return initialProperties;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_PROJECTS`);
    if (saved) {
      try {
        const list: Project[] = JSON.parse(saved);
        return list.map((p) => {
          if (p.slug === 'kalam-cottages' || p.id === 'proj-2') {
            return {
              ...p,
              renderBuildingImage: '/assets/buildings/kalam-cottage.png',
            };
          }
          return p;
        });
      } catch {
        return initialProjects;
      }
    }
    return initialProjects;
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_HERO_SLIDES`);
    return saved ? JSON.parse(saved) : initialHeroSlides;
  });

  const [pageHeroes, setPageHeroes] = useState<Record<string, PageHero>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_PAGE_HEROES`);
    return saved ? JSON.parse(saved) : initialPageHeroes;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_INQUIRIES`);
    return saved ? JSON.parse(saved) : initialInquiries;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_APPOINTMENTS`);
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_MESSAGES`);
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_BLOGS`);
    return saved ? JSON.parse(saved) : initialBlogPosts;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_TESTIMONIALS`);
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_SETTINGS`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        parsed.email = 'info@peshawars.com';
        // Ensure WhatsApp and inquiries are always updated to 03117000900
        if (!parsed.whatsapp || parsed.whatsapp.includes('8593450')) {
          parsed.whatsapp = '03117000900';
        }
        if (parsed.whatsappSettings) {
          parsed.whatsappSettings.showNumberLabel = false;
        }
        if (!parsed.whatsappSettings || parsed.whatsappSettings.phoneNumber?.includes('8593450')) {
          parsed.whatsappSettings = {
            ...initialSiteSettings.whatsappSettings,
            ...parsed.whatsappSettings,
            phoneNumber: '03117000900',
            intlNumber: '923117000900',
          };
        }
        return parsed;
      } catch {
        return initialSiteSettings;
      }
    }
    return initialSiteSettings;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_AUDIT_LOGS`);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'log-1',
            timestamp: new Date().toISOString(),
            action: 'System Initialized',
            actor: 'System',
            details: 'Initial verified database loaded with 4 development projects.',
          },
        ];
  });

  // Sync states to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_PROPERTIES`, JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_PROJECTS`, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_HERO_SLIDES`, JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_PAGE_HEROES`, JSON.stringify(pageHeroes));
  }, [pageHeroes]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_INQUIRIES`, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_APPOINTMENTS`, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_MESSAGES`, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_BLOGS`, JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_TESTIMONIALS`, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_SETTINGS`, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_AUDIT_LOGS`, JSON.stringify(auditLogs));
  }, [auditLogs]);

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      action,
      actor: 'Admin',
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 99)]);
  };

  // Property handlers
  const addProperty = (newProp: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = 'prop-' + Date.now();
    const created = new Date().toISOString();
    const prop: Property = { ...newProp, id, createdAt: created, updatedAt: created };
    setProperties((prev) => [prop, ...prev]);
    addAuditLog('Created Property', `Added listing: ${prop.title}`);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
    addAuditLog('Updated Property', `Updated property ID ${id}`);
  };

  const deleteProperty = (id: string) => {
    const target = properties.find((p) => p.id === id);
    setProperties((prev) => prev.filter((p) => p.id !== id));
    addAuditLog('Deleted Property', `Deleted listing: ${target?.title || id}`);
  };

  // Project handlers
  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, ...updates } : proj))
    );
    addAuditLog('Updated Project', `Modified project details for ID ${id}`);
  };

  // Town Garden exclusive video handler
  const updateTownGardenVideo = (videoData: {
    videoUrl?: string;
    videoPoster?: string;
    videoTitle?: string;
    videoDescription?: string;
    hasVideo?: boolean;
  }) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.slug === 'town-garden') {
          return {
            ...proj,
            videoUrl: videoData.videoUrl !== undefined ? videoData.videoUrl : proj.videoUrl,
            videoPoster: videoData.videoPoster !== undefined ? videoData.videoPoster : proj.videoPoster,
            videoTitle: videoData.videoTitle !== undefined ? videoData.videoTitle : proj.videoTitle,
            videoDescription:
              videoData.videoDescription !== undefined
                ? videoData.videoDescription
                : proj.videoDescription,
            hasVideo: videoData.hasVideo !== undefined ? videoData.hasVideo : proj.hasVideo,
          };
        }
        return proj;
      })
    );
    addAuditLog('Updated Town Garden Video', 'Updated primary project video settings');
  };

  // Apartment handlers
  const addApartmentToProject = (projectId: string, apt: Omit<ApartmentPlan, 'id'>) => {
    const aptId = 'apt-' + Date.now();
    const fullApt: ApartmentPlan = { ...apt, id: aptId };
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, apartments: [...p.apartments, fullApt] } : p))
    );
    addAuditLog('Added Apartment', `Added ${fullApt.title} to project ${projectId}`);
  };

  const updateApartment = (
    projectId: string,
    apartmentId: string,
    updates: Partial<ApartmentPlan>
  ) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            apartments: p.apartments.map((a) => (a.id === apartmentId ? { ...a, ...updates } : a)),
          };
        }
        return p;
      })
    );
    addAuditLog('Updated Apartment', `Updated apartment ${apartmentId} in project ${projectId}`);
  };

  const deleteApartment = (projectId: string, apartmentId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            apartments: p.apartments.filter((a) => a.id !== apartmentId),
          };
        }
        return p;
      })
    );
    addAuditLog('Deleted Apartment', `Deleted apartment ${apartmentId} from project ${projectId}`);
  };

  // Hero management
  const updateHeroSlide = (id: string, updates: Partial<HeroSlide>) => {
    setHeroSlides((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    addAuditLog('Updated Hero Slide', `Updated slide ${id}`);
  };

  const addHeroSlide = (slide: Omit<HeroSlide, 'id'>) => {
    const newSlide: HeroSlide = { ...slide, id: 'slide-' + Date.now() };
    setHeroSlides((prev) => [...prev, newSlide]);
    addAuditLog('Added Hero Slide', `Added new hero carousel slide`);
  };

  const deleteHeroSlide = (id: string) => {
    setHeroSlides((prev) => prev.filter((s) => s.id !== id));
    addAuditLog('Deleted Hero Slide', `Removed hero slide ${id}`);
  };

  const updatePageHero = (path: string, updates: Partial<PageHero>) => {
    setPageHeroes((prev) => {
      const existing = prev[path] || {
        pagePath: path,
        pageName: path,
        title: '',
        subtitle: '',
        image: '/assets/hero/slide1.jpg',
      };
      return {
        ...prev,
        [path]: { ...existing, ...updates },
      };
    });
    addAuditLog('Updated Page Hero', `Updated hero configuration for route ${path}`);
  };

  // Inquiries
  const addInquiry = (inq: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inq,
      id: 'inq-' + Date.now(),
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status'], notes?: string) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id
          ? { ...inq, status, ...(notes !== undefined ? { internalNotes: notes } : {}) }
          : inq
      )
    );
    addAuditLog('Updated Inquiry', `Marked inquiry ${id} as ${status}`);
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  // Appointments
  const addAppointment = (apt: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    const newApt: Appointment = {
      ...apt,
      id: 'apt-' + Date.now(),
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newApt, ...prev]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    addAuditLog('Updated Appointment', `Status of appointment ${id} set to ${status}`);
  };

  // Contact messages
  const addContactMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      read: false,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const markMessageAsRead = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  // Blogs
  const addBlog = (blog: Omit<BlogPost, 'id' | 'publishedAt'>) => {
    const newPost: BlogPost = {
      ...blog,
      id: 'blog-' + Date.now(),
      publishedAt: new Date().toISOString().split('T')[0],
    };
    setBlogs((prev) => [newPost, ...prev]);
    addAuditLog('Published Blog', `Created blog post: ${blog.title}`);
  };

  const updateBlog = (id: string, updates: Partial<BlogPost>) => {
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    addAuditLog('Updated Blog', `Modified blog ${id}`);
  };

  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    addAuditLog('Deleted Blog', `Removed blog ${id}`);
  };

  // Testimonials
  const addTestimonial = (test: Omit<Testimonial, 'id' | 'date'>) => {
    const newTest: Testimonial = {
      ...test,
      id: 'test-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setTestimonials((prev) => [newTest, ...prev]);
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  // Settings
  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    addAuditLog('Updated Settings', 'Updated company profile and contact settings');
  };

  const resetAllData = () => {
    localStorage.clear();
    setProperties(initialProperties);
    setProjects(initialProjects);
    setHeroSlides(initialHeroSlides);
    setPageHeroes(initialPageHeroes);
    setInquiries(initialInquiries);
    setAppointments(initialAppointments);
    setMessages(initialMessages);
    setBlogs(initialBlogPosts);
    setTestimonials(initialTestimonials);
    setSettings(initialSiteSettings);
    addAuditLog('Data Reset', 'Restored system to initial default state');
  };

  return (
    <DataContext.Provider
      value={{
        properties,
        projects,
        heroSlides,
        pageHeroes,
        inquiries,
        appointments,
        messages,
        blogs,
        testimonials,
        settings,
        auditLogs,
        addProperty,
        updateProperty,
        deleteProperty,
        updateProject,
        updateTownGardenVideo,
        addApartmentToProject,
        updateApartment,
        deleteApartment,
        updateHeroSlide,
        addHeroSlide,
        deleteHeroSlide,
        updatePageHero,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        addAppointment,
        updateAppointmentStatus,
        addContactMessage,
        markMessageAsRead,
        addBlog,
        updateBlog,
        deleteBlog,
        addTestimonial,
        updateTestimonial,
        updateSettings,
        resetAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};


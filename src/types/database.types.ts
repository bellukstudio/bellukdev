export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          title: string;
          overview: string;
          photo: string | null;
          cv_url: string | null;
          github: string | null;
          linkedin: string | null;
          email: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          image: string | null;
          github: string | null;
          demo: string | null;
          tech_stack: string[];
          featured: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["projects"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["projects"]["Row"]>;
        Relationships: [];
      };
      experiences: {
        Row: {
          id: string;
          company: string;
          position: string;
          start_date: string;
          end_date: string | null;
          description: string;
          logo: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["experiences"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["experiences"]["Row"]>;
        Relationships: [];
      };
      skills: {
        Row: {
          id: string;
          name: string;
          icon: string;
        };
        Insert: Partial<Database["public"]["Tables"]["skills"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["skills"]["Row"]>;
        Relationships: [];
      };
      contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["contacts"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["contacts"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

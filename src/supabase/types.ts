export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type Tables<TRow, TInsert = Partial<TRow>, TUpdate = Partial<TRow>> = {
  Row: TRow
  Insert: TInsert
  Update: TUpdate
}

export interface Database {
  public: {
    Tables: {
      client_profiles: Tables<
        {
          id: string
          updated_at: string | null
          full_name: string | null
          company_name: string | null
          avatar_url: string | null
          role: string | null
          contact_name: string | null
          contact_phone: string | null
          has_completed_onboarding: boolean
          onboarding_completed_at: string | null
          onboarding_data: Json | null
        },
        {
          id: string
          updated_at?: string | null
          full_name?: string | null
          company_name?: string | null
          avatar_url?: string | null
          role?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          has_completed_onboarding?: boolean
          onboarding_completed_at?: string | null
          onboarding_data?: Json | null
        }
      >
      service_requests: Tables<
        {
          id: string
          created_at: string
          client_id: string
          client_email: string | null
          client_name: string | null
          service_type: string
          description: string | null
          type: string | null
          status: string
          budget: number | null
          currency: string | null
          metadata: Json | null
          website_type: string | null
          ai_requirements: string | null
          company_name: string | null
          website_url: string | null
          contact_number: string | null
          whatsapp_number: string | null
        },
        {
          id?: string
          created_at?: string
          client_id: string
          client_email?: string | null
          client_name?: string | null
          service_type: string
          description?: string | null
          type?: string | null
          status?: string
          budget?: number | null
          currency?: string | null
          metadata?: Json | null
          website_type?: string | null
          ai_requirements?: string | null
          company_name?: string | null
          website_url?: string | null
          contact_number?: string | null
          whatsapp_number?: string | null
        }
      >
      projects: Tables<
        {
          id: string
          created_at: string
          client_id: string
          title: string
          name: string | null
          description: string | null
          status: string
          progress: number | null
          start_date: string | null
          end_date: string | null
          milestones: Json | null
          updates: Json | null
          budget: number | null
          currency: string | null
          quick_call_number: string | null
          whatsapp_link: string | null
          notion_link: string | null
          google_doc_link: string | null
        },
        {
          id?: string
          created_at?: string
          client_id: string
          title: string
          name?: string | null
          description?: string | null
          status?: string
          progress?: number | null
          start_date?: string | null
          end_date?: string | null
          milestones?: Json | null
          updates?: Json | null
          budget?: number | null
          currency?: string | null
          quick_call_number?: string | null
          whatsapp_link?: string | null
          notion_link?: string | null
          google_doc_link?: string | null
        }
      >
      invoices: Tables<
        {
          id: string
          created_at: string
          project_id: string | null
          client_id: string
          client_name: string | null
          amount: number
          currency: string
          status: string
          due_date: string | null
          items: Json | null
          upi_id: string | null
        },
        {
          id?: string
          created_at?: string
          project_id?: string | null
          client_id: string
          client_name?: string | null
          amount: number
          currency?: string
          status?: string
          due_date?: string | null
          items?: Json | null
          upi_id?: string | null
        }
      >
      meeting_requests: Tables<
        {
          id: string
          created_at: string
          client_id: string | null
          client_name: string | null
          client_email: string | null
          topic: string | null
          preferred_date: string | null
          preferred_time: string | null
          status: string
          notes: string | null
        },
        {
          id?: string
          created_at?: string
          client_id?: string | null
          client_name?: string | null
          client_email?: string | null
          topic?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          status?: string
          notes?: string | null
        }
      >
      roles_admin: Tables<
        {
          id: string
          admin_id: string
          email: string
          role: string
          created_at: string | null
        },
        {
          id?: string
          admin_id: string
          email: string
          role?: string
          created_at?: string | null
        }
      >
    }
  }
}

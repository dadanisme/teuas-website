-- =============================================
-- TEUAS Users Migration
-- Creates users table and related tables for alumni profiles
-- =============================================

-- Create enum types for major and degree
CREATE TYPE major_type AS ENUM (
  'Teknik Elektro',
  'Pendidikan Teknik Elektro'
);

CREATE TYPE degree_type AS ENUM (
  'S1',
  'D3'
);

CREATE TYPE social_platform_type AS ENUM (
  'linkedin',
  'twitter',
  'instagram',
  'facebook',
  'github',
  'youtube',
  'tiktok',
  'website'
);

CREATE TYPE user_role_type AS ENUM (
  'admin',
  'user'
);

-- Create users table (main profile table)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  nim TEXT NOT NULL,
  email TEXT NOT NULL,
  role user_role_type DEFAULT 'user' NOT NULL,
  year INTEGER,
  major major_type,
  degree degree_type,
  bio TEXT,
  location TEXT,
  photo_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- Create user experiences table
CREATE TABLE public.user_experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create user educations table
CREATE TABLE public.user_educations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  start_date DATE,
  end_date DATE,
  grade TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create user socials table
CREATE TABLE public.user_socials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  platform social_platform_type NOT NULL,
  url TEXT NOT NULL,
  username TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create user skills table
CREATE TABLE public.user_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT, -- e.g., 'Programming', 'Design', 'Management'
  level TEXT, -- e.g., 'Beginner', 'Intermediate', 'Advanced', 'Expert'
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create user certifications table
CREATE TABLE public.user_certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_nim ON public.users(nim);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_major ON public.users(major);
CREATE INDEX idx_users_year ON public.users(year);
CREATE INDEX idx_users_deleted ON public.users(deleted);

CREATE INDEX idx_user_experiences_user_id ON public.user_experiences(user_id);
CREATE INDEX idx_user_educations_user_id ON public.user_educations(user_id);
CREATE INDEX idx_user_socials_user_id ON public.user_socials(user_id);
CREATE INDEX idx_user_skills_user_id ON public.user_skills(user_id);
CREATE INDEX idx_user_certifications_user_id ON public.user_certifications(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON public.users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_experiences_updated_at 
  BEFORE UPDATE ON public.user_experiences 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_educations_updated_at 
  BEFORE UPDATE ON public.user_educations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_socials_updated_at 
  BEFORE UPDATE ON public.user_socials 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_skills_updated_at 
  BEFORE UPDATE ON public.user_skills 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_certifications_updated_at 
  BEFORE UPDATE ON public.user_certifications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_socials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_certifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone" ON public.users
  FOR SELECT USING (deleted = false);

-- Create RLS policies for user_experiences table
CREATE POLICY "Users can manage their own experiences" ON public.user_experiences
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public experiences are viewable by everyone" ON public.user_experiences
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = user_experiences.user_id 
      AND users.deleted = false
    )
  );

-- Create RLS policies for user_educations table
CREATE POLICY "Users can manage their own educations" ON public.user_educations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public educations are viewable by everyone" ON public.user_educations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = user_educations.user_id 
      AND users.deleted = false
    )
  );

-- Create RLS policies for user_socials table
CREATE POLICY "Users can manage their own socials" ON public.user_socials
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public socials are viewable by everyone" ON public.user_socials
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = user_socials.user_id 
      AND users.deleted = false
    )
  );

-- Create RLS policies for user_skills table
CREATE POLICY "Users can manage their own skills" ON public.user_skills
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public skills are viewable by everyone" ON public.user_skills
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = user_skills.user_id 
      AND users.deleted = false
    )
  );

-- Create RLS policies for user_certifications table
CREATE POLICY "Users can manage their own certifications" ON public.user_certifications
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public certifications are viewable by everyone" ON public.user_certifications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = user_certifications.user_id 
      AND users.deleted = false
    )
  );

-- Create storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true);

-- Create storage policy for avatars bucket
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile when auth user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add comments for documentation
COMMENT ON TABLE public.users IS 'Main user profiles table linked to Supabase Auth';
COMMENT ON TABLE public.user_experiences IS 'User work experience entries';
COMMENT ON TABLE public.user_educations IS 'User educational background';
COMMENT ON TABLE public.user_socials IS 'User social media links';
COMMENT ON TABLE public.user_skills IS 'User skills and expertise';
COMMENT ON TABLE public.user_certifications IS 'User professional certifications';

COMMENT ON COLUMN public.users.id IS 'References auth.users(id)';
COMMENT ON COLUMN public.users.photo_url IS 'URL to profile photo in Supabase Storage';
COMMENT ON COLUMN public.users.deleted IS 'Soft delete flag';

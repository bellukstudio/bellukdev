export type Profile = {
  id: string;
  name: string;
  title: string;
  overview: string;
  photo: string | null;
  cvUrl: string | null;
  github: string | null;
  linkedin: string | null;
  email: string | null;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  github: string | null;
  demo: string | null;
  techStack: string[];
  featured: boolean;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  logo: string | null;
};

export type Skill = {
  id: string;
  name: string;
  icon: string;
};

export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export type ServiceResult<T> =
  | { data: T; error: null }
  | { data: null; error: string };

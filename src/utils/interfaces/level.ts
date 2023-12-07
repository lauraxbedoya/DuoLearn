export interface Level {
  id?: number;
  sectionId?: number;
  title: string;
  description: string;
  imageUrl?: number;
  type: string;
  order: number;
  enabled: boolean;
  section?: [];
}

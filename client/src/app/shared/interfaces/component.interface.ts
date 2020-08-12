export interface ComponentInterface {
  type?: string;
  name?: string;
  selector: string;
  content: string;
  style?: string;
  parameters?: {
    name: string;
    defaultValue: any;
  }[];
}

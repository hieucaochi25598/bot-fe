import { AITypeOptions } from "../IAI";

export interface IAddAIFormData {
    type: keyof typeof AITypeOptions;
    prompt: string;
}

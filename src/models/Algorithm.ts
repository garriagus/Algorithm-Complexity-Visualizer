import { ObjectId } from "mongodb";

export default interface Algorithm {
    name: string;
    description: number;
    complexity: string;
    example_input: string;
    example_output: string;
    code_snippet: string;
    id?: ObjectId;
}
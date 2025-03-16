import { ObjectId, Timestamp } from "mongodb";

export default interface ComplexityResult {
    input_size: Number;
    execution_time_ms: Timestamp;
    id?: ObjectId;
}
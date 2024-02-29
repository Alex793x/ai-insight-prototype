export type TopicComments = {
    ID: number;
    received: string;
    module: string;
    idea?: string; // Made optional as per your type definition
    description?: string; // Made optional as per your type definition
    label: string | null; // Made optional as per your type definition
    country: "Finland" | "Sweden" | "Denmark" | "Germany"; // Corrected "Findland" to "Finland" and "Sweeden" to "Sweden"
    category: string;
    comments_eng: string;
    subtopic_relevance: string;
    subtopic: string | null
}

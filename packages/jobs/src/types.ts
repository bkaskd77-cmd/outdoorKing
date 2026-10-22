export const jobNames = ["email.send", "content.embed"] as const;

export type JobName = (typeof jobNames)[number];

export type EmailSendJob = {
  name: "email.send";
  payload: {
    to: string;
    subject: string;
    html: string;
  };
};

export type ContentEmbedJob = {
  name: "content.embed";
  payload: {
    sourceType: string;
    sourceId: string;
    locale: string;
    content: string;
  };
};

export type Job = EmailSendJob | ContentEmbedJob;

export type QueueDriver = "inline" | "bullmq" | "qstash";

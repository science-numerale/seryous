interface Attachment {
	name: string;  // Name of the attachment (e.g., 'attachment.jpg')
	url: string;   // URL of the attachment (e.g., 'https://example.com/file.jpg')
	type?: string; // Mime type of the attachment (optional, e.g., 'image/jpeg')
	size?: number; // Size of the attachment in bytes (optional, e.g., 33848)
	expires?: number; // Attachment expiry date as Unix time stamp (optional)
}

interface ActionButton {
	// Define fields for actions here (example structure, adjust to your requirements)
	title: string; // Title of the button
	action: string; // URL or action triggered when clicked
}

export interface Message {
	id: string;          // Randomly chosen message identifier (e.g., 'hwQ2YpKdmg')
	time: number;        // Message date time as Unix timestamp (e.g., 1635528741)
	expires?: number;    // Unix timestamp indicating when the message will be deleted (optional)
	event: 'open' | 'keepalive' | 'message' | 'poll_request'; // Message type
	topic: string;       // Comma-separated list of topics the message is associated with (e.g., 'topic1,topic2')
	message: string;     // Message body (e.g., 'Some message')
	content_type?: string;// text/markdown...
	title?: string;      // Message title (optional, defaults to 'ntfy.sh/<topic>')
	tags?: string[];     // List of tags that may or may not map to emojis (optional)
	priority?: 1 | 2 | 3 | 4 | 5;  // Message priority with 1=min, 3=default, 5=max (optional)
	click?: string;      // URL that is opened when notification is clicked (optional)
	actions?: ActionButton[]; // List of action buttons (optional)
	attachment?: Attachment; // Attachment details (optional)
}


export function onMessage(url: string, callback: (m: Message) => void) {
	const eventSource = new EventSource(url);

	eventSource.onmessage = (e) => {
		const data = JSON.parse(e.data) as Message
		if (data.event === "message") callback(JSON.parse(e.data))
	};

	return () => eventSource.close()
}

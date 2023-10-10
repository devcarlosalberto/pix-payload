import Payload from "./payload.class"
import type { PayloadProps } from "./payload.class"

export function payload(props: PayloadProps): string {
	return new Payload(props).get()
}

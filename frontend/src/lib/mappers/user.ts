import type { UserApi } from "@/types/api/user"
import type { User } from "@/types/user"

export default function mapUser(user: UserApi): User {
  return {
    username: user.username,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
  }
}

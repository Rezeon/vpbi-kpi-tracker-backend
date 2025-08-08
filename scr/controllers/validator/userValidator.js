const { z } = require('zod');

const userSchema = z.object({
  clerkId: z.string(),
  role: z.enum(["user", "admin"], {
    errorMap: () => ({ message: "Role harus berupa USER atau ADMIN." })
  }),
  karyawanId: z.int(),
  username: z.string(),
  email: z.email(),
});
const karyawanSchema = z.object({
    
})

module.exports = { userSchema };

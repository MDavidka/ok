export async function submitContact(formData: FormData) { const name = String(formData.get("name") || "Guest"); return { ok: true, message: `Thanks ${name}, we will contact you shortly.` } }

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface EditCounsellorModalProps {
    counsellor: any | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (id: string, data: any) => Promise<void>
}

export function EditCounsellorModal({ counsellor, open, onOpenChange, onSave }: EditCounsellorModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        speciality: "",
        charges: 0,
        bio: "",
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (counsellor && open) {
            setFormData({
                name: counsellor.name || "",
                speciality: counsellor.speciality || "",
                charges: counsellor.charges || 0,
                bio: counsellor.bio || "",
            })
        }
    }, [counsellor, open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!counsellor) return
        console.log(counsellor.id, formData)
        setLoading(true)
        try {
            await onSave(counsellor.id, formData)
            onOpenChange(false)
        } catch (err) {
            console.error("Failed to save counsellor:", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Counsellor</DialogTitle>
                    <DialogDescription>
                        Update profile details for {counsellor?.name}.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="speciality">Speciality</Label>
                            <Input
                                id="speciality"
                                value={formData.speciality}
                                onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="charges">Charges ($/hr)</Label>
                            <Input
                                id="charges"
                                type="number"
                                min="0"
                                value={formData.charges}
                                onChange={(e) => setFormData({ ...formData, charges: parseFloat(e.target.value) || 0 })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bio">Bio / Title</Label>
                            <Input
                                id="bio"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

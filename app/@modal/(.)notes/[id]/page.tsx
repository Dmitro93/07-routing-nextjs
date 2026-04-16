import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Modal>
      <NotePreview id={params.id} />
    </Modal>
  );
}
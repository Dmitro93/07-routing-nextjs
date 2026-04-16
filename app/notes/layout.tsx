export default function NotesLayout({
  children,
  sidebar,
  modal,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "250px" }}>{sidebar}</aside>
      <main style={{ flex: 1 }}>{children}</main>
      {modal}
    </div>
  );
}
export default function Layout({
  children,
  sidebar,
  modal,
}: {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {sidebar}
      {modal}
    </div>
  );
}
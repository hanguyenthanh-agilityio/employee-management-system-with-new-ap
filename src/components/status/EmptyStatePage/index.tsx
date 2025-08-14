interface EmptyStatePageProps {
  title: string;
}

const EmptyStatePage = ({ title }: EmptyStatePageProps) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
    <h1 className="text-5xl font-extrabold mb-4 text-blue-600">{title}</h1>
    <p className="text-2xl text-gray-600 text-center">
      This section is currently under construction.
    </p>
  </div>
);

export default EmptyStatePage;

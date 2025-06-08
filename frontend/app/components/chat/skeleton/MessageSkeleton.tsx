const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'} mb-4`}
        >
          <div className="flex items-start gap-2">
            {idx % 2 === 0 && (
              <div className="w-10 h-10 rounded-full bg-gray-600 animate-pulse" />
            )}
            <div className="max-w-[70%]">
              <div className="text-xs text-gray-400 mb-1">
                <div className="h-4 w-16 bg-gray-600 animate-pulse rounded" />
              </div>
              <div className="p-3 rounded-lg bg-gray-600 animate-pulse h-16 w-[200px]" />
            </div>
            {idx % 2 !== 0 && (
              <div className="w-10 h-10 rounded-full bg-gray-600 animate-pulse" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
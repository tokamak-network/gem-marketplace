const SavedIcon = ({
  width = 16,
  height = 13,
  isFill,
}: {
  width?: number;
  height?: number;
  isFill?: boolean;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 20"
      fill={isFill ? "#FFF" : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.36275 6.70343L11.4383 18.0478C12.2389 19.0486 13.7611 19.0486 14.5617 18.0478L19 12.5L23.6373 6.70343C24.37 5.78752 24.1609 4.44057 23.1849 3.78994L20.1094 1.7396C19.4376 1.29173 18.5624 1.29173 17.8906 1.7396L13 5L8.1094 1.7396C7.4376 1.29173 6.5624 1.29173 5.8906 1.7396L2.81508 3.78994C1.83914 4.44057 1.63002 5.78752 2.36275 6.70343Z"
        stroke="white"
        strokeOpacity="1"
        strokeWidth="2"
      />
    </svg>
  );
};

export default SavedIcon;

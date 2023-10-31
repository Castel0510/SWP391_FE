export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const renderRatingStars = (rating) => {
  const numberOfYellowStars = Math.floor(rating);
  const numberOfGrayStars = 5 - numberOfYellowStars;
  const stars = [];

  for (let i = 0; i < numberOfYellowStars; i++) {
    stars.push(
      <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    )
  }

  for (let i = 0; i < numberOfGrayStars; i++) {
    stars.push(
      <svg className="w-4 h-4 text-gray-200 dark:text-gray-600 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    )
  }

  return stars;
}

export const truncateString = (str, maxLength) => {
  const lorem = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab inventore saepe harum ipsam error! Accusamus, error, delectus quo maiores in architecto officiis impedit harum repellat, iste cupiditate ipsam quia asperiores.'
  if (str?.length > maxLength) {
    return str?.substring(0, maxLength) + '...';
  } else if (str === 'string') {
    return lorem.substring(0, maxLength) + '...';
  }
  return str;
}

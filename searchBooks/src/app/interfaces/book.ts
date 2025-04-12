export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    publisher: string;
    publishedDate: string;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

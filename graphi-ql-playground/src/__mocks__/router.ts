const pushMock = jest.fn();
export const useRouter = jest.fn().mockReturnValue({ push: pushMock });

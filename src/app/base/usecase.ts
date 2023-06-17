export default interface UseCase {
  execute: (args?: any) => Promise<any>;
}

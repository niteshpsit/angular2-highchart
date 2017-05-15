/* SystemJS module definition */
interface NodeRequireFunction {
    (id: string): any;
}
interface NodeRequire extends NodeRequireFunction {
    resolve(id: string): string;
    cache: any;
    extensions: any;
    main: NodeModule | undefined;
}
declare var require: NodeRequire;
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
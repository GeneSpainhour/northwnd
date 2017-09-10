declare var app: {
  environment: string;
};

// declare function require(id: string): any;

declare var jQuery: JQueryStatic, $: JQueryStatic;

declare var tinymce: any;

interface Array<T> {
  distinct(cb?: (T) => any) : Array<T>
}

interface String {
  capitalize(): string
}

export interface MintedToken {
  attributes?: AttributesEntity[] | null;
  image: string;
  name: string;
}

interface AttributesEntity {
  trait_type: string;
  value: string;
}

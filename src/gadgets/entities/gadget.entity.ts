import type { CreateGadgetDto } from '../dto/create-gadget.dto.js';

export interface Gadget extends CreateGadgetDto {
  id: string;
}

import { supabaseAdmin } from "../supabase/admin";

export abstract class BaseRepository<T extends Record<string, any>> {
  constructor(
    protected readonly table: string
  ) {}

  async findById(id: string): Promise<T | null> {
    const { data, error } = await supabaseAdmin
      .from(this.table)
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data as T | null;
  }

  async findAll(): Promise<T[]> {
    const { data, error } = await supabaseAdmin
      .from(this.table)
      .select("*");

    if (error) {
      throw error;
    }

    return (data ?? []) as T[];
  }

  async create(payload: Record<string, unknown>): Promise<T> {
    const { data, error } = await supabaseAdmin
      .from(this.table)
      .insert(payload as never)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as T;
  }

  async update(
    id: string,
    payload: Record<string, unknown>
  ): Promise<T> {
    const { data, error } = await supabaseAdmin
      .from(this.table)
      .update(payload as never)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as T;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabaseAdmin
      .from(this.table)
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
  }
}

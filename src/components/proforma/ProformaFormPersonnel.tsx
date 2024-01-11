import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { useInfiniteQuery, useQuery } from "react-query";
import api from "@/services/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/useToast";
import { useIntersection } from "@mantine/hooks";
import { Skeleton } from "../ui/skeleton";
import debounce from "lodash.debounce";

interface FromPersonnel extends PersonnelDetail {
  isSelect: boolean;
}

interface PersonalCount {
  position: PersonnelPosition;
  count: number;
}

interface CommandItemPersonnelProps {
  personnel: FromPersonnel;
  onSelect: (personnel: FromPersonnel) => void;
}

interface countByPosition {
  [key: number]: { position: number; count: number };
}

export function ProformaFormPersonnel({ form }: any) {
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [elementosDisponibles, setElementosDisponibles] = useState<
    FromPersonnel[]
  >([]);
  const [keyword, setKeyword] = useState("");

  const getEmployees = async (page: number) => {
    try {
      const { data } = await api.get(`/employees?page=${page}`);
      return data.results;
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cargar los empleados",
        variant: "destructive",
      });
    }
  };

  const getEmployeesByKeyword = async () => {
    try {
      const { data } = await api.get(`/employees?search=${keyword}`);
      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cargar los empleados",
        variant: "destructive",
      });
    }
  };

  const {
    data: personnelList,
    fetchNextPage,
    refetch,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["personnel", keyword],
    async ({ pageParam = 1 }) => {
      if (!keyword) {
        return await getEmployees(pageParam);
      }
      return await getEmployeesByKeyword();
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [10],
        pageParams: [1],
      },
      enabled: false,
    }
  );

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  useEffect(() => {
    debounceRequest();
  }, [keyword]);

  useEffect(() => {
    if (personnelList && personnelList.pages) {
      const personal = personnelList.pages.flatMap((page: any) =>
        Array.isArray(page)
          ? page.map((obj: FromPersonnel) => ({
              ...obj,
              isSelect: personnel.some(
                (element) => element.employees_id === obj.employee_id
              ),
            }))
          : []
      );
      setElementosDisponibles(personal);
    }
  }, [personnelList]);

  const handleSelect = () => {
    const countByPosition =
      elementosDisponibles &&
      elementosDisponibles.reduce<countByPosition>((conteo, obj) => {
        if (obj.isSelect && obj.position && obj.position.id_position) {
          const posicionId = obj.position.id_position;
          conteo[posicionId] = conteo[posicionId] || {
            position: obj.position,
            count: 0,
          };
          conteo[posicionId].count += 1;
        }
        return conteo;
      }, {});
    return countByPosition ? (
      <BadgeListPersonnel personnel={Object.values(countByPosition)} />
    ) : null;
  };

  const onSelect = useCallback(
    (personnel: FromPersonnel) => {
      form.setValue("personal_proyecto", personnel);
      setElementosDisponibles((prev) => {
        const nuevosElementos = prev.map((obj) =>
          obj.employee_id === personnel.employee_id
            ? { ...obj, isSelect: !obj.isSelect }
            : obj
        );
        const listaSeleccionados = nuevosElementos
          .filter((obj) => obj.isSelect)
          .map((obj) => ({ employees_id: obj.employee_id }));
        setPersonnel(listaSeleccionados);
        return nuevosElementos;
      });
    },
    [form, personnel]
  );

  useEffect(() => {
    form.setValue("personal_proyecto", personnel);
  }, [personnel]);

  const lastEmployeeRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastEmployeeRef.current,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!keyword) {
      if (entry?.isIntersecting) fetchNextPage();
    }
  }, [entry]);

  const _personnel = elementosDisponibles;
  const arraySkeleton = Array.from({ length: 10 });
  return (
    <div className="border rounded-lg p-4">
      <p className="font-bold mb-4">Personal del Proyecto</p>
      {/* <Button onClick={() => console.log(elementosDisponibles)}>
        elementosDisponibles
      </Button> */}
      <div className="flex gap-20 p-4">
        <div className="flex flex-col gap-8">
          <div className="flex items-center space-x-4">
            <FormField
              control={form.control}
              name="personal_proyecto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal: </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-auto justify-start text-muted-foreground"
                        >
                          Agregar un colaborador
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" side="right" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Buscar Colaborador..."
                          isLoading={isFetching}
                          value={keyword}
                          onValueChange={(text) => {
                            setKeyword(text);
                            debounceRequest();
                          }}
                        />

                        <CommandGroup className="h-40">
                          <ScrollArea className="w-full h-40">
                            {_personnel.length === 0 ? (
                              <CommandEmpty>
                                <p>No hay colaboradores</p>
                              </CommandEmpty>
                            ) : (
                              <>
                                {_personnel
                                  .slice(0, -1)
                                  .map((personnel: FromPersonnel) => (
                                    <CommandItemPersonnel
                                      key={personnel.employee_id}
                                      personnel={personnel}
                                      onSelect={onSelect}
                                    />
                                  ))}
                                {_personnel.length > 0 && (
                                  <div
                                    key={
                                      _personnel[_personnel.length - 1]
                                        .employee_id
                                    }
                                    ref={ref}
                                    className="flex flex-col gap-2"
                                  >
                                    {!keyword && <div className="p-1" />}

                                    {isFetchingNextPage &&
                                      arraySkeleton.map((_, index) => (
                                        <Skeleton
                                          key={index}
                                          className="w-full h-12"
                                        />
                                      ))}
                                    <CommandItemPersonnel
                                      key={
                                        _personnel[_personnel.length - 1]
                                          .employee_id
                                      }
                                      personnel={
                                        _personnel[_personnel.length - 1]
                                      }
                                      onSelect={onSelect}
                                    />
                                  </div>
                                )}
                              </>
                            )}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4 max-w-[10rem]">
            {handleSelect()}
          </div>
        </div>
        <div>
          <FormField
            control={form.control}
            name="work_time"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="w-[15rem]">Tiempo de Trabajo: </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="N° Dias" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}

function CommandItemPersonnel({
  personnel,
  onSelect,
}: CommandItemPersonnelProps) {
  return (
    <CommandItem
      className="gap-4 justify-between"
      value={personnel.name}
      key={personnel.employee_id}
      onSelect={() => onSelect(personnel)}
    >
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage
            src=""
            alt="user profile image"
            className="object-cover"
          />
          <AvatarFallback>{getInitials(personnel.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p>{personnel.name}</p>
          <p className="text-sm text-muted-foreground truncate">
            {personnel.position.name}
          </p>
        </div>
      </div>

      <Check
        className={cn(
          "mr-2 h-4 w-4",
          personnel.isSelect ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );
}

function BadgeListPersonnel({ personnel }: { personnel: PersonalCount[] }) {
  return (
    <div className="flex flex-col gap-4 max-w-[10rem]">
      {personnel.map((item: PersonalCount) => (
        <Badge
          key={item.position.id_position}
          className="flex gap-2 p-1 px-3 rounded-lg"
        >
          {item.count}
          <p className="truncate">{item.position.name}</p>
        </Badge>
      ))}
    </div>
  );
}

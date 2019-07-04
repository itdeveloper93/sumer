import { Injectable } from '@angular/core';

/**
 * The shape of returned Employee
 */
export interface Employee {
    id: string;
    photoPath: string;
    fullName: string;
    department: string;
    position: string;
    hasAccount: boolean;
    phone: string;
    email: string;
    hireDate?: Date;
    lockDate?: Date;
    lockReason?: string;
}

/**
 * The shape of fetch criterias for DB searching
 */
export interface FetchCriterias {
    name?: string;
    department?: string;
    hasAccount?: boolean;
    locked?: boolean;
    offset?: number;
    count?: number;
}

@Injectable({
    providedIn: 'root'
})
export class EmployeesService {
    /**
     * Determines whether we're in the process of fetching
     * data through HTTP
     */
    isRequesting = false;

    constructor() {}

    get(criterias?: FetchCriterias): Employee[] {
        let response: Employee[];

        // Simulate filtered response
        if (criterias && criterias.locked) {
            response = [
                {
                    id: '23r2uh-23rbjk-23jkb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Родионова Ираида Данииловна',
                    department: 'Управление учета',
                    position: 'Специалист по логистике',
                    hasAccount: false,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro',
                    hireDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockReason: 'Выход в декрет'
                },
                {
                    id: '23rdwh-23rbjk-23jkb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Раджабов Алексей Махмадназарович',
                    department: 'Бухгалтерия',
                    position: 'Главный бухгалтер',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro',
                    hireDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockReason: 'Уход с работы'
                },
                {
                    id: '23rdwh-2wrbjk-23jkb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Ильина Радмила Ильяовна',
                    department: 'Служба безопасности',
                    position: 'Директор службы безопасности',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro',
                    hireDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockReason: 'Уход с работы'
                },
                {
                    id: '23rdwh-2wrbjk-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Жданова Розалина Агафоновна',
                    department: 'Плановый отдел',
                    position: 'Специалист по планированию реализации',
                    hasAccount: false,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro',
                    hireDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockReason: 'Выход в декрет'
                },
                {
                    id: '23rsh-2wrbjk-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Агафонова Милда Борисовна',
                    department: 'Технический отдел',
                    position: 'Системный администратор',
                    hasAccount: false,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro',
                    hireDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockReason: 'Перевод'
                },
                {
                    id: '2srsh-2wrbjk-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Тихонов Герасим Олегович',
                    department: 'Отдел главного конструктора',
                    position: 'Главный конструктор',
                    hasAccount: false,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro',
                    hireDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockReason: 'Перевод'
                },
                {
                    id: '2srsh-2wrajk-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Самойлова Берта Валентиновна',
                    department: 'Отдел капитального строительства',
                    position: 'Прораб',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro',
                    hireDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockReason: 'Уход с работы'
                },
                {
                    id: '2srsh-2wrajk-23wkb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Никонова Харита Адольфовна',
                    department: 'Транспортный отдел',
                    position: 'Водитель',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro',
                    hireDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockReason: 'Выход в декрет'
                },
                {
                    id: '2srsh-2wraek-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Ильина Радмила Ильяовна',
                    department: 'Служба безопасности',
                    position: 'Директор службы безопасности',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro',
                    hireDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockDate: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
                    lockReason: 'Перевод'
                }
            ];
        } else {
            response = [
                {
                    id: '23r2uh-23rbjk-23jkb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Родионова Ираида Данииловна',
                    department: 'Управление учета',
                    position: 'Специалист по логистике',
                    hasAccount: false,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '23rdwh-23rbjk-23jkb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Раджабов Алексей Махмадназарович',
                    department: 'Бухгалтерия',
                    position: 'Главный бухгалтер',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '23rdwh-2wrbjk-23jkb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Ильина Радмила Ильяовна',
                    department: 'Служба безопасности',
                    position: 'Директор службы безопасности',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '23rdwh-2wrbjk-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Жданова Розалина Агафоновна',
                    department: 'Плановый отдел',
                    position: 'Специалист по планированию реализации',
                    hasAccount: false,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '23rsh-2wrbjk-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Агафонова Милда Борисовна',
                    department: 'Технический отдел',
                    position: 'Системный администратор',
                    hasAccount: false,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '2srsh-2wrbjk-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Тихонов Герасим Олегович',
                    department: 'Отдел главного конструктора',
                    position: 'Главный конструктор',
                    hasAccount: false,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '2srsh-2wrajk-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Самойлова Берта Валентиновна',
                    department: 'Отдел капитального строительства',
                    position: 'Прораб',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '2srsh-2wrajk-23wkb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Никонова Харита Адольфовна',
                    department: 'Транспортный отдел',
                    position: 'Водитель',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '2srsh-2wraek-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Ильина Радмила Ильяовна',
                    department: 'Служба безопасности',
                    position: 'Директор службы безопасности',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '23r2uh-23rbjk-23jkb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Родионова Ираида Данииловна',
                    department: 'Управление учета',
                    position: 'Специалист по логистике',
                    hasAccount: false,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '23rdwh-23rbjk-23jkb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Раджабов Алексей Махмадназарович',
                    department: 'Бухгалтерия',
                    position: 'Главный бухгалтер',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '23rdwh-2wrbjk-23jkb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Ильина Радмила Ильяовна',
                    department: 'Служба безопасности',
                    position: 'Директор службы безопасности',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '23rdwh-2wrbjk-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Жданова Розалина Агафоновна',
                    department: 'Плановый отдел',
                    position: 'Специалист по планированию реализации',
                    hasAccount: false,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '23rsh-2wrbjk-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Агафонова Милда Борисовна',
                    department: 'Технический отдел',
                    position: 'Системный администратор',
                    hasAccount: false,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '2srsh-2wrbjk-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Тихонов Герасим Олегович',
                    department: 'Отдел главного конструктора',
                    position: 'Главный конструктор',
                    hasAccount: false,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '2srsh-2wrajk-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Самойлова Берта Валентиновна',
                    department: 'Отдел капитального строительства',
                    position: 'Прораб',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '2srsh-2wrajk-23wkb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Никонова Харита Адольфовна',
                    department: 'Транспортный отдел',
                    position: 'Водитель',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                },
                {
                    id: '2srsh-2wraek-23skb',
                    photoPath: 'https://i.pravatar.cc/300',
                    fullName: 'Ильина Радмила Ильяовна',
                    department: 'Служба безопасности',
                    position: 'Директор службы безопасности',
                    hasAccount: true,
                    phone: '907 07 77 33',
                    email: 'aleksey@it-2b.pro'
                }
            ];
        }

        return response;
    }
}

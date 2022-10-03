// 4. Database Structure

// Chosen method is "Models prepared using your favorite ORM framework". As a favorite ORM TypeORM is used in the code

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    OneToMany,
    ManyToOne,
    JoinColumn
} from 'typeorm';

// The secondary side of OneToOne relationships are not given
// For ManyToOne relationship, the reverse (OneToMany) is also given

@Entity({ name: "Drive" })
class Drive {
    @PrimaryGeneratedColumn()
    drive_id!: number;

    @Column()
    distance!: number;

    @CreateDateColumn()
    Date!: Date;

    // ManyToOne - considering that a person can have multiple drives
    @ManyToOne(() => Person, (person) => person.drives)
    person: Person;

    // ManyToOne - considering that a vicle can be used for multiple drives
    @ManyToOne(() => Vehicle, (vehicle) => vehicle.drives)
    vehicle: Vehicle;
}

@Entity({ name: "Vehicle" })
class Vehicle {

    @PrimaryGeneratedColumn()
    vehicle_id!: number;

    @Column({ type: "varchar" })
    modal!: string;

    @Column()
    plate_number!: number;

    // OneToOne - considering that a person can have only one vehicle
    @OneToOne(() => Person)
    @JoinColumn()
    person: Person;

    // OneToMany - considering that a vicle can be used for multiple drives
    @OneToMany(() => Drive, (drive) => drive.vehicle)
    drives: Drive[];
}

@Entity({ name: "Address" })
class Address {
    @PrimaryGeneratedColumn()
    address_id!: number;

    @Column({ type: "varchar" })
    street!:string;

    @Column({ type: "varchar" })
    city!: string;

    @Column({ type: "varchar" })
    country!: string;

    // ManyToOne - considering that a person can live in multiple addresses
    @ManyToOne(() => Person, (person) => person.addresses)
    person: Person;
}

@Entity({ name: "Person" })
class Person {
    @PrimaryGeneratedColumn()
    person_id!: number;

    @Column({ type: "varchar" })
    name!: string;

    // OneToMany - considering that a person can live in multiple addresses
    @OneToMany(() => Address, (address) => address.person)
    addresses: Address[];

    // OneToMany - considering that a vicle can be used for multiple drives
    @OneToMany(() => Drive, (drive) => drive.person)
    drives: Drive[];
}

@Entity({ name: "Student" })
class Student {
    @PrimaryGeneratedColumn()
    student_id!: number;

    @Column()
    student_number!:number;

    // OneToOne - considering that a person can be either student or professor
    @OneToOne(() => Person)
    @JoinColumn()
    person: Person;
}

@Entity({ name: "Professor" })
class Professor {
    @PrimaryGeneratedColumn()
    professor_id!: number;

    @Column()
    salary!:number;

    // OneToOne - considering that a person can be either student or professor
    @OneToOne(() => Person)
    @JoinColumn()
    person: Person;
}
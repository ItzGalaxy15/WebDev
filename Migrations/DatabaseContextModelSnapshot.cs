﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using StarterKit.Models;

#nullable disable

namespace StarterKit.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.4");

            modelBuilder.Entity("StarterKit.Models.Admin", b =>
                {
                    b.Property<int>("AdminId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("AdminId");

                    b.HasIndex("UserName")
                        .IsUnique();

                    b.ToTable("Admin");

                    b.HasData(
                        new
                        {
                            AdminId = 1,
                            Email = "admin1@example.com",
                            Password = "^�H��(qQ��o��)'s`=\rj���*�rB�",
                            UserName = "admin1"
                        },
                        new
                        {
                            AdminId = 2,
                            Email = "admin2@example.com",
                            Password = "\\N@6��G��Ae=j_��a%0�QU��\\",
                            UserName = "admin2"
                        },
                        new
                        {
                            AdminId = 3,
                            Email = "admin3@example.com",
                            Password = "�j\\��f������x�s+2��D�o���",
                            UserName = "admin3"
                        },
                        new
                        {
                            AdminId = 4,
                            Email = "admin4@example.com",
                            Password = "�].��g��Պ��t��?��^�T��`aǳ",
                            UserName = "admin4"
                        },
                        new
                        {
                            AdminId = 5,
                            Email = "admin5@example.com",
                            Password = "E�=���:�-����gd����bF��80]�",
                            UserName = "admin5"
                        });
                });

            modelBuilder.Entity("StarterKit.Models.Attendance", b =>
                {
                    b.Property<int>("AttendanceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("AttendanceDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("AttendanceId");

                    b.HasIndex("UserId");

                    b.ToTable("Attendance");
                });

            modelBuilder.Entity("StarterKit.Models.Event", b =>
                {
                    b.Property<int>("EventId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("AdminApproval")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("EventDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("EventId");

                    b.HasIndex("EventId")
                        .IsUnique();

                    b.ToTable("Event");

                    b.HasData(
                        new
                        {
                            EventId = 1,
                            AdminApproval = true,
                            Description = "First day",
                            EndTime = new TimeSpan(0, 15, 0, 0, 0),
                            EventDate = new DateOnly(2024, 9, 2),
                            Location = "Hogeschool Rotterdam",
                            StartTime = new TimeSpan(0, 10, 30, 0, 0),
                            Title = "Opening"
                        },
                        new
                        {
                            EventId = 2,
                            AdminApproval = true,
                            Description = "Last day",
                            EndTime = new TimeSpan(0, 12, 0, 0, 0),
                            EventDate = new DateOnly(2025, 6, 30),
                            Location = "Hogeschool Rotterdam",
                            StartTime = new TimeSpan(0, 11, 0, 0, 0),
                            Title = "Final"
                        });
                });

            modelBuilder.Entity("StarterKit.Models.Event_Attendance", b =>
                {
                    b.Property<int>("Event_AttendanceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("EventId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Feedback")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Rating")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Event_AttendanceId");

                    b.HasIndex("EventId");

                    b.HasIndex("Event_AttendanceId")
                        .IsUnique();

                    b.ToTable("Event_Attendance");

                    b.HasData(
                        new
                        {
                            Event_AttendanceId = 1,
                            EventId = 1,
                            Feedback = "It was excellent",
                            Rating = 5,
                            UserId = 1
                        },
                        new
                        {
                            Event_AttendanceId = 2,
                            EventId = 2,
                            Feedback = "It was bad",
                            Rating = 2,
                            UserId = 1
                        },
                        new
                        {
                            Event_AttendanceId = 3,
                            EventId = 1,
                            Feedback = "It was good",
                            Rating = 4,
                            UserId = 2
                        },
                        new
                        {
                            Event_AttendanceId = 4,
                            EventId = 1,
                            Feedback = "It was awful",
                            Rating = 1,
                            UserId = 3
                        },
                        new
                        {
                            Event_AttendanceId = 5,
                            EventId = 2,
                            Feedback = "It was okay",
                            Rating = 3,
                            UserId = 3
                        },
                        new
                        {
                            Event_AttendanceId = 6,
                            EventId = 2,
                            Feedback = "It was decent",
                            Rating = 3,
                            UserId = 4
                        });
                });

            modelBuilder.Entity("StarterKit.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("RecuringDays")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("UserId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("User");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            Email = "max@example.com",
                            FirstName = "Max",
                            LastName = "Bretherton",
                            Password = "+�\rS{���a��V�����qb���_�{�'�[",
                            RecuringDays = "mo,tu,we"
                        },
                        new
                        {
                            UserId = 2,
                            Email = "max@example.com",
                            FirstName = "Amer",
                            LastName = "Alhasoun",
                            Password = "+�\rS{���a��V�����qb���_�{�'�[",
                            RecuringDays = "we,th,fr"
                        },
                        new
                        {
                            UserId = 3,
                            Email = "max@example.com",
                            FirstName = "Aymane",
                            LastName = "Aazouz",
                            Password = "+�\rS{���a��V�����qb���_�{�'�[",
                            RecuringDays = "mo,we,fr"
                        },
                        new
                        {
                            UserId = 4,
                            Email = "max@example.com",
                            FirstName = "Jordy",
                            LastName = "Mahn",
                            Password = "+�\rS{���a��V�����qb���_�{�'�[",
                            RecuringDays = "tu,we,th"
                        });
                });

            modelBuilder.Entity("StarterKit.Models.Attendance", b =>
                {
                    b.HasOne("StarterKit.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("StarterKit.Models.Event_Attendance", b =>
                {
                    b.HasOne("StarterKit.Models.Event", null)
                        .WithMany("Event_Attendances")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StarterKit.Models.Event", b =>
                {
                    b.Navigation("Event_Attendances");
                });
#pragma warning restore 612, 618
        }
    }
}

